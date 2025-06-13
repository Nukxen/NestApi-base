import chalk from 'chalk';

export class BeatifulyConsole {
  private static Base(hasError: boolean, message: string) {
    console.log(
      `${hasError ? chalk.redBright(`[ERROR]`) : chalk.greenBright(`[ APP ]`)} - ${message}\n`,
    );
  }

  public static message(message: string, hasError?: boolean) {
    if (hasError) {
      this.Base(true, message);
      return;
    }
    this.Base(false, message);
  }
}
