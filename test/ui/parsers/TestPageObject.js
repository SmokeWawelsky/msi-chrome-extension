function PageObject() {
  this.userMresearch = element(by.id("p_Username"));
  this.passMresearch = element(by.id("p_Password"));
  this.loginButtonMresearch = element(by.id("p_LoginButton"));
  this.clientLogoMresearch = element(by.xpath("//div[contains(@class,'app-logo')]"));
}
