const dotenv =require("dotenv")  ;
const { GoogleGenerativeAI } =require("@google/generative-ai") ;

dotenv.config();

const genAI = new GoogleGenerativeAI(process.env.API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

async function genResponse(prompt) {
    const result = await model.generateContent(prompt, {
        textType: "message",
    });
    const output = result.response.text();
    return output;
}

module.exports = {
    result: genResponse,
};

