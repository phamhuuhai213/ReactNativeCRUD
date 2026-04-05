import { CATEGORIES } from '../constants/categories';


const OPENROUTER_API_KEY = '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';
const OPENROUTER_MODEL = 'qwen/qwen3.6-plus:free';

export interface AIProductInfo {
  idsanpham: string;
  tensp: string;
  loaisp: string;
  gia: string;
}

export const scanProductImage = async (base64Uri: string): Promise<AIProductInfo | null> => {
  try {
    const prompt = `Bạn là một trợ lý ảo chuyên nhận diện sản phẩm.
    Tôi sẽ cung cấp cho bạn một bức ảnh sản phẩm. Dựa vào ảnh, hãy trích xuất các thông tin sau và TRẢ VỀ CHÍNH XÁC MỘT ĐỐI TƯỢNG JSON MÀ THÔI, ĐỪNG THÊM BẤT KỲ VĂN BẢN NÀO KHÁC BÊN NGOÀI JSON (Không dùng markdown tick \`\`\`json).
    Định dạng JSON yêu cầu:
    {
      "idsanpham": "Sinh ra một mã ngắn VD: SP01, MOUSE01...",
      "tensp": "Tên sản phẩm dự đoán",
      "loaisp": "Chọn đúng 1 trong các chữ sau: ${CATEGORIES.join(', ')}",
      "gia": "Dự đoán giá tấp xỉ (chỉ viết số, không viết chữ đ hay vnd. Ví dụ: 50000)"
    }
    Nếu bạn không rõ, hãy dự đoán hợp lý nhất có thể.
    `;

    const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${OPENROUTER_API_KEY}`,
        'HTTP-Referer': 'https://reactnativecrud.app',
        'X-Title': 'React Native CRUD',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: OPENROUTER_MODEL,
        response_format: { type: "json_object" },
        messages: [
          {
            role: 'user',
            content: [
              { type: 'text', text: prompt },
              {
                type: 'image_url',
                image_url: { url: base64Uri }
              }
            ]
          }
        ]
      })
    });

    if (!response.ok) {
      const errText = await response.text();
      console.error('OpenRouter API Error:', errText);
      return null;
    }

    const data = await response.json();
    const content = data.choices[0].message.content;

    // Parse JSON
    try {
      const parsed = JSON.parse(content);
      return {
        idsanpham: parsed.idsanpham || 'SP001',
        tensp: parsed.tensp || '',
        loaisp: CATEGORIES.includes(parsed.loaisp) ? parsed.loaisp : CATEGORIES[0],
        gia: String(parsed.gia).replace(/[^0-9]/g, '') || '0',
      };
    } catch (e) {
      console.error("Lỗi parse JSON từ AI:", e, content);
      return null;
    }

  } catch (error) {
    console.error('Lỗi khi gọi OpenRouter:', error);
    return null;
  }
};
