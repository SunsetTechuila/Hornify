class Hornify {
  private static pornTags: string[];

  private static bodyObserver = new MutationObserver(Hornify.handleBodyMutation);

  private static async fetchPornTagsAsync(): Promise<void> {
    const response = await fetch('https://sunsettechuila.github.io/Hornify/assets/porn-tags.json');
    if (!response.ok) throw new Error('Failed to fetch porn tags');
    Hornify.pornTags = await response.json();
  }

  private static getRandomNumber(max: number, min = 0): number {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  private static rollDice(diceSidesCount: number, targetPoints = diceSidesCount): boolean {
    const actualPoints = Hornify.getRandomNumber(diceSidesCount, 1);
    return targetPoints === actualPoints;
  }

  private static cleanString(inputString: string): string {
    const specialChars = [
      '!',
      '@',
      '#',
      '$',
      '%',
      '^',
      '&',
      '*',
      '(',
      ')',
      '-',
      '_',
      '+',
      '=',
      '[',
      ']',
      '{',
      '}',
      ';',
      ':',
      '<',
      '>',
      '.',
      ',',
      '/',
      '?',
      '№',
      '•',
      '★',
      '\u00A0', // nbsp
    ];
    const regexChars = new RegExp(`[${specialChars.join('\\')}]`, 'g');
    const regexNumbers = /\d/g;
    return inputString.replace(regexChars, '').replace(regexNumbers, '');
  }

  private static hornifyString(inputString: string): string {
    let hornifiedString = inputString;
    const { pornTags } = Hornify;
    const pornTagsMaxIndex = pornTags.length - 1;

    inputString.split(' ').forEach((subString) => {
      const cleanedSubString = Hornify.cleanString(subString);
      if (cleanedSubString !== '') {
        if (Hornify.rollDice(8)) {
          let randomPornTag = pornTags[Hornify.getRandomNumber(pornTagsMaxIndex)];
          const upperCased = cleanedSubString.toUpperCase();

          if (cleanedSubString === upperCased && cleanedSubString.length > 1) {
            randomPornTag = randomPornTag.toUpperCase();
          } else if (cleanedSubString[0] === upperCased[0]) {
            randomPornTag = randomPornTag[0].toUpperCase() + randomPornTag.slice(1);
          }

          hornifiedString = hornifiedString.replace(cleanedSubString, randomPornTag);
        }
      }
    });

    return hornifiedString;
  }

  private static processNode(inputNode: Node): void {
    const { parentElement } = inputNode;
    if (
      inputNode.nodeType === Node.TEXT_NODE &&
      !parentElement?.classList.contains('hornify-processed')
    ) {
      parentElement?.classList.add('hornify-processed');
      const { textContent } = inputNode;
      const text = textContent?.trim();
      if (textContent != null && text != null && text !== '') {
        // eslint-disable-next-line no-param-reassign
        inputNode.textContent = textContent.replace(text, Hornify.hornifyString(text));
      }
    }
  }

  private static processNodesRecursive(inputNode: Node): void {
    const { nodeName } = inputNode;
    if (nodeName !== 'SCRIPT' && nodeName !== 'STYLE' && nodeName !== 'LINK') {
      Hornify.processNode(inputNode);

      const { childNodes } = inputNode;
      for (let i = 0, max = childNodes.length; i < max; i += 1) {
        Hornify.processNodesRecursive(childNodes[i]);
      }
    }
  }

  private static handleBodyMutation(mutationList: MutationRecord[]): void {
    mutationList.forEach((mutation) => {
      const { addedNodes } = mutation;
      for (let i = 0, max = addedNodes.length; i < max; i += 1) {
        Hornify.processNodesRecursive(addedNodes[i]);
      }
    });
  }

  public static async enableAsync(): Promise<void> {
    await Hornify.fetchPornTagsAsync();
    Hornify.bodyObserver.observe(document.body, { childList: true, subtree: true });
  }

  public static disable(): void {
    Hornify.bodyObserver.disconnect();
  }
}

function main() {
  Hornify.enableAsync();
}

export default main;
