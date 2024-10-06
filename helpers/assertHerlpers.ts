
import chai from 'chai';
import chaiJsonSchema from 'chai-json-schema';

// Use chai-json-schema plugin
chai.use(chaiJsonSchema);

class AssertHelper {
  /**
   * Validates the given response object against the provided JSON schema.
   * @param response - The API response object to be validated.
   * @param schema - The JSON schema to validate against.
   */
  async validateJsonSchema(response: object, schema: object): Promise<void> {
    await chai.expect(response, `Expect schema is changed \n Expect Schema:\n ${JSON.stringify(schema, null, 2)} \n Acutal Schema: \n ${JSON.stringify(response, null, 2)} \n`).to.be.jsonSchema(schema);
  }

  async validateResponseIsString(response: object): Promise<void> {
    await chai.expect(response, `Expect Response is changed \n Acutal Response: \n ${JSON.stringify(response, null, 2)} \n`).to.be.an('string');
  }
}

export default AssertHelper;