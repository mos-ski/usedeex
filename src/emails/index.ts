import { emailCatalog, emailCategories, type EmailName } from "./catalog";
import type { EmailPayload, TemplateDefinition } from "./types";

export { emailCatalog, emailCategories };
export type { EmailName };

export type EmailDataMap = {
  [K in EmailName]: (typeof emailCatalog)[K]["sample"];
};

export function renderEmail<N extends EmailName>(name: N, data: EmailDataMap[N]): string {
  const definition = emailCatalog[name] as TemplateDefinition | undefined;
  if (!definition) throw new Error(`Unknown email template: ${name}`);

  const record = (data ?? {}) as EmailPayload;
  for (const key of definition.required) {
    if (record[String(key)] === undefined) {
      throw new Error(`Missing email token: ${String(key)}`);
    }
  }

  return definition.render(record);
}

export const emailSamples = Object.fromEntries(
  Object.entries(emailCatalog).map(([id, definition]) => [id, definition.sample]),
) as EmailDataMap;
