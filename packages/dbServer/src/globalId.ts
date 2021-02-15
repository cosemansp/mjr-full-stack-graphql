export type Base64String = string;

export function base64(i: string): Base64String {
  return Buffer.from(i, 'utf8').toString('base64');
}

export function unbase64(i: Base64String): string {
  return Buffer.from(i, 'base64').toString('utf8');
}

/**
 * Takes a type name and an ID specific to that type name, and returns a
 * "global ID" that is unique among all types.
 */
export function toGlobalId(type: string, id: string | number): string {
  return base64([type, id.toString()].join(':'));
}

/**
 * Takes the "global ID" created by toGlobalID, and returns the type name and ID
 * used to create it.
 */
export function fromGlobalId(globalId: string) {
  const unbasedGlobalId = unbase64(globalId);
  const delimiterPos = unbasedGlobalId?.indexOf(':');
  return {
    type: unbasedGlobalId?.substring(0, delimiterPos),
    id: unbasedGlobalId?.substring(delimiterPos + 1),
  };
}
