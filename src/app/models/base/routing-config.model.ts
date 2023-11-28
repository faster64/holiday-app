export class RoutingConfig {
  public path = "";
  public key = "";
  public industry = "";

  constructor(path: string, key: string, industry?: string) {
    this.path = path;
    this.key = key;
    this.industry = industry;
  }
}
