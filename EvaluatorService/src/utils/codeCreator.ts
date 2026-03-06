export default function codeCreator(
  startCode: string,
  midCode: string,
  endCode: string,
): string {
  return `
      ${startCode}

      ${midCode}

       ${endCode}
`;
}

/**
for python end code can be empty string
for java end code can be empty string

 */
