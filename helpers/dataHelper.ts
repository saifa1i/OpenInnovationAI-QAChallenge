class DataHelper {
    modelBody: object;
    modelVersionBody: object;
    modelInferBody: object;
    modelBodyFailed: object;
    inferEndpointResponse: string;

    constructor() {
        this.modelBody = {
            "name": `My Model`,
            "owner": "john"
        },
        this.modelVersionBody = {
            "name": `Version 1 - Tiny Llama`,
            "hugging_face_model": "TinyLlama/TinyLlama-1.1B-Chat-v1.0"
        },
        this.modelInferBody = {
            "text": `Hi, how are you?`,
            "apply_template": false,
            "max_new_tokens": 256,
            "do_sample": true,
            "temperature": 0.7,
            "top_k": 50,
            "top_p": 0.95
        },
        this.modelBodyFailed = {
            "name": `My Model`,
        }
        this.inferEndpointResponse = "Hi, how are you? I'm glad to hear that you had a good time on your vacation. Do you have any pictures to share with me? I'd love to see them!"
    }

    generateRandomString(length: number): string {
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        let result = '';

        for (let i = 0; i < length; i++) {
            const randomIndex = Math.floor(Math.random() * characters.length);
            result += characters.charAt(randomIndex);
        }

        return result;
    }
}
export default DataHelper;