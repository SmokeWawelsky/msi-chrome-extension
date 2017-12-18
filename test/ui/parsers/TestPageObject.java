package com.bank.app.pageObject.msuite;


import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.FindBy;
import org.openqa.selenium.support.PageFactory;

import pageObject.PageTemplate;

public class AdminPage extends PageTemplate{

	//  These Xpaths are from this page https://lapislazuli-qa.modernsurvey.com/ApplicationAdmin?applicationType=None

	// Navigation Menu

	@FindBy(xpath="//ul[@class='app-nav__primary']//li//a[contains(@href,'/m360Admin')]")
    public WebElement m360AdminLink;

	@FindBy(xpath="//ul[@class='app-nav__primary']//li//a[contains(@href,'/mPerformAdmin')]")
    public WebElement mPerformAdminLink;

	@FindBy(xpath="//ul[@class='app-nav__primary']//li//a[contains(@href,'/mResearchAdmin')]")
    public WebElement mResearchAdminLink;

	@FindBy(xpath="//ul[@class='app-nav__primary']//li//a[contains(@href,'/mThriveAdmin')]")
    public WebElement mThriveAdminLink;

	@FindBy(xpath="//ul[@class='app-nav__primary']//li//a[contains(@href,'/mActionAdmin')]")
    public WebElement mActionAdminLink;

	@FindBy(xpath="//ul[@class='app-nav__primary']//li//a[contains(@href,'/HeatAdmin')]")
    public WebElement HeatAdminLink;


	// Top Navigation Admin Menu

	@FindBy(xpath="//ul[@Class='main-nav__primary cf']//a[contains(@href,'/Admin')]")
    public WebElement AdminLink;

	@FindBy(xpath="//ul[@Class='main-nav__primary cf']//a[contains(@href,'/ApplicationAdmin')]")
    public WebElement ApplicationAdmin;

	@FindBy(xpath="//ul[@Class='main-nav__primary cf']//a[contains(@href,'/ClientAdmin')]")
    public WebElement ClientAdmin;

	@FindBy(xpath="//ul[@Class='main-nav__primary cf']//a[contains(@href,'/AgentAdmin')]")
    public WebElement AgentAdmin;

	@FindBy(xpath="//ul[@Class='main-nav__primary cf']//a[contains(@href,'/SystemAdmin')]")
    public WebElement SystemAdmin;



	// Box Buttons
	@FindBy(xpath="//div[contains(@class,'routing-grid__button')]//a[contains(@href,'/m360Admin')]")
    public WebElement m360AdminButton;

	@FindBy(xpath="//div[contains(@class,'routing-grid__button')]//a[contains(@href,'/mPerformAdmin')]")
    public WebElement mPerformAdminButton;

	@FindBy(xpath="//div[contains(@class,'routing-grid__button')]//a[contains(@href,'/mResearchAdmin')]")
    public WebElement mResearchAdminButton;

	@FindBy(xpath="//div[contains(@class,'routing-grid__button')]//a[contains(@href,'/mThriveAdmin')]")
    public WebElement mThriveAdminButton;

	@FindBy(xpath="//div[contains(@class,'routing-grid__button')]//a[contains(@href,'/mActionAdmin')]")
    public WebElement mActionAdminButton;

	@FindBy(xpath="//div[contains(@class,'routing-grid__button')]//a[contains(@href,'/Heat')]")
    public WebElement heatAdminButton;

	@FindBy(xpath="//a[@href='/Handlers/Logout.ashx']")
	public WebElement logoutButton;


	public AdminPage(WebDriver driver)
	{
		PageFactory.initElements(driver, this);
	}
}
