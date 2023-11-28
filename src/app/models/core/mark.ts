import { NotificationType } from "./notify-type.enum";

export class Mark {
  public allowNotice = true;
  public notificationType = NotificationType.MessageBox;

  constructor(allowNotice: boolean, notificationType = NotificationType.MessageBox) {
    this.allowNotice = allowNotice;
    this.notificationType = notificationType;
  }

  static getMark(url: string): Mark {
    return new Mark(true, NotificationType.MessageBox);
  }
}
