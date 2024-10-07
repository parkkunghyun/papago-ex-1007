// import { error } from "console";

// const apiKey = process.env.NEXT_PUBLIC_GOOGLE_TRANSLATE_API_KEY // .env.local에서 API 키를 가져옵니다.

// export default async function handler(req, res) {
//     if (req.method === 'POST') {
//         const { text, targetLanguage } = req.body;

//         try {
//             const response = await fetch(`https://translation.googleapis.com/language/translate/v2?key=${apiKey}`,
//                 {
//                     method: 'POST',
//                     headers: {
//                         'Content-Type': 'application/json',
//                     },
//                     body: JSON.stringify({
//                         q: text,
//                         target: targetLanguage,
//                     }),
//                 }
//             )

//             if (response.ok) {
//                 const data = await response.json()
//                 res.status(200).json(data.data.translations[0].translatedText);
//             } else {
//                 res.status(response.status).json({
//                     error: 'Translation API request failed',
//                     details: response.statusText,
//                 })
//             } 
//         }
//         catch (error) {
//             res.status(500).json({ error: 'Internal server error', details: error.message });
//         }
//     } else {
//         res.status(405).json({ message: 'Method not allowed' });
//     }
// }