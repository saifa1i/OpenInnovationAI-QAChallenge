import { test, expect, APIResponse } from '@playwright/test';
import AssertHelper from '../helpers/assertHerlpers';
import DataHelper from '../helpers/dataHelper';
import getModelSchema from '../jsonSchema/getModelSchema.json'
import postModelSchema from '../jsonSchema/postModelSchema.json';
import postModelVersionSchema from '../jsonSchema/postModelVersionSchema.json';
import getModelVersionSchema from '../jsonSchema/getModelVersionSchema.json'

test.describe('Open Innovation Ai - QA Challenge | Model Inference Endpoints', () => {
  let assertHelper = new AssertHelper();
  let dataHelper = new DataHelper();
  let modelId: string;
  let versionId: string;

  test.beforeAll(async ({ request }) => {
    const modelsResponse: APIResponse = await request.get('/models');
    const responseBody = await modelsResponse.json()
    if (responseBody.length > 0) {
      for (let res of responseBody) {
        const modelsResponse: APIResponse = await request.delete(`/models/${res.id}`);
        expect(modelsResponse.ok(), `Endpoint status is change to ${modelsResponse.status()}`).toBeTruthy();
      }
    }

    const modelBody = dataHelper.modelBody;
    const modelsresponse: APIResponse = await request.post('/models', {
      data: modelBody
    });
    const body = await modelsresponse.json()
    modelId = body.id;
    expect(modelsresponse.ok(), `Endpoint status is change to ${modelsresponse.status()}`).toBeTruthy();
    await assertHelper.validateJsonSchema(body, postModelSchema);
    const modelVersionBody = dataHelper.modelVersionBody;
    const modelsVersionPost: APIResponse = await request.post(`/models/${modelId}/versions`, {
      data: modelVersionBody
    });
    const versionbody = await modelsVersionPost.json()
    versionId = versionbody.id
    expect(modelsVersionPost.ok(), `Endpoint status is change to ${modelsVersionPost.status()}`).toBeTruthy();
  })

  test('Fast Api Post Model infer Endpoints', async ({ request }) => {
    test.setTimeout(1800 * 1000)
    
    const modelInferBody = dataHelper.modelInferBody;
    const modelInferResponse: APIResponse = await request.post(`/models/${modelId}/versions/${versionId}/infer`, {
      data: modelInferBody
    });
    const responseBody = await modelInferResponse.json()
    expect(modelInferResponse.ok(), `Endpoint status is change to ${modelInferResponse.status()}`).toBeTruthy();
    await assertHelper.validateResponseIsString(responseBody);
  });

  test.afterAll(async ({ request }) => {
    const modelsResponse: APIResponse = await request.get('/models');
    const responseBody = await modelsResponse.json()
    if (responseBody.length > 0) {
      for (let res of responseBody) {
        console.log(res.id)
        const modelsResponse: APIResponse = await request.delete(`/models/${res.id}`);
        expect(modelsResponse.ok(), `Endpoint status is change to ${modelsResponse.status()}`).toBeTruthy();
      }
    }
  });
});

