import Ajv from "ajv";

const ajv = new Ajv();

export function validateSchema(data, schema) {
  const validate = ajv.compile(schema);

  const valid = validate(data);

  if (!valid) {
    console.error("Schema validation errors:");
    console.error(validate.errors);
  }

  return valid;
}