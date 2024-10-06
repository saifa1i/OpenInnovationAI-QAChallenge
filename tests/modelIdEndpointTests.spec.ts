import { test, expect, APIResponse } from '@playwright/test';
import AssertHelper from '../helpers/assertHerlpers';
import DataHelper from '../helpers/dataHelper';
import getModelSchema from '../jsonSchema/getModelSchema.json'
import postModelSchema from '../jsonSchema/postModelSchema.json';
import postModelVersionSchema from '../jsonSchema/postModelVersionSchema.json';
import getModelVersionSchema from '../jsonSchema//getModelVersionSchema.json'

test.describe('Open Innovation Ai - QA Challenge | Model versions Endpoints', () => {
  let assertHelper = new AssertHelper();
  let dataHelper = new DataHelper();
  let modelId: string;
  let versionId: string;

  test.beforeAll(async ({ request }) => {
    const modelBody = dataHelper.modelBody;
    const modelsResponse: APIResponse = await request.post('/models', {
      data : modelBody
    });
    const responseBody = await modelsResponse.json()
    modelId = responseBody.id;
    expect(modelsResponse.ok(), `Endpoint status is change to ${modelsResponse.status()}`).toBeTruthy();
    await assertHelper.validateJsonSchema(responseBody, postModelSchema);
  })

  test('Fast Api Post Model version Endpoints', async ({ request }) => {
    const modelVersionBody = dataHelper.modelVersionBody;
    const modelVersionResponse: APIResponse = await request.post(`/models/${modelId}/versions`, {
      data: modelVersionBody
    });
    const responseBody = await modelVersionResponse.json()
    versionId = responseBody.id
    expect(modelVersionResponse.ok(), `Endpoint status is change to ${modelVersionResponse.status()}`).toBeTruthy();
    await assertHelper.validateJsonSchema(responseBody, postModelVersionSchema);
  });

  test('Fast Api Get Models version Endpoints', async ({ request }) => {
    const modelsVersionResponse: APIResponse = await request.get(`/models/${modelId}/versions`);
    const responseBody = await modelsVersionResponse.json()
    expect(modelsVersionResponse.ok(), `Endpoint status is change to ${modelsVersionResponse.status()}`).toBeTruthy();
    await assertHelper.validateJsonSchema(responseBody, getModelVersionSchema);
  });

  test('Fast Api Delete Models Endpoints', async ({ request }) => {
    const modelsVersionDelete: APIResponse = await request.delete(`/models/${modelId}/versions/${versionId}`);
    const responseBody = await modelsVersionDelete.json()
    expect(modelsVersionDelete.ok(), `Endpoint status is change to ${modelsVersionDelete.status()}`).toBeTruthy();
    expect(responseBody).toBeNull()
  });

});

