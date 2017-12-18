using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using OpenQA.Selenium;
using OpenQA.Selenium.Support.PageObjects;

namespace ModernSurvey.Tests.Regression.Pages.Heat
{
    class FilterGroupPage
    {
        private IWebDriver driver;

        //filter contol

        [FindsBy(How=How.XPath , Using ="//div[@tour-target-id='FilterTimeFrame']")]
        internal IWebElement TimeTrendSelection;

        [FindsBy(How = How.XPath, Using = "//div[@tour-target-id='FilterFocalGroup']")]
        internal IWebElement FilterSelection;

        [FindsBy(How = How.XPath, Using = "//div[contains(@class,'modal-form')]//div[contains(@class,'export-scope-selector__value')]")]
        internal IWebElement FilterSelectionCustomExportModal;

        [FindsBy(How = How.XPath, Using = "//div[@class='explorer-modal modal-form']//div[@tour-target-id='FilterFocalGroup']")]
        internal IWebElement FilterSelectionModal;

        //[FindsBy(How = How.XPath, Using = "//div[@class='explorer-modal modal-form']//div[@filter-id='filterId']")]
        //internal IWebElement FilterSelectionModal;

        [FindsBy(How = How.XPath, Using = "//span[text()='by Demographics']")]
        internal IWebElement FilterByDemographicsGroup;

        [FindsBy(How = How.XPath, Using = "//div[@title='Age Range']")]
        internal IWebElement FilterByDemographicsAgeRange;

        [FindsBy(How = How.XPath, Using = "//input[@value='Baby Boomers (born 1946-1964)']")]
        internal IWebElement FilterByDemographicsAgeRangeBabyBoomers;

        [FindsBy(How = How.XPath, Using = "(//div[@filter-id='filterId']//input[@ng-model='vm.searchText'])[2]")]
        internal IWebElement FilterBySearchInput;

        [FindsBy(How = How.XPath, Using = "//div[@filter-id='filterId']//input[@type='checkbox']")]
        internal IList<IWebElement> FilterByResultsList { get; set; }

        [FindsBy(How = How.XPath, Using = "//div[@ng-click='vm.apply()']")]
        internal IWebElement ApplyFilterButton;

        [FindsBy(How = How.XPath, Using = "//div[contains(@ng-repeat,'DatasetSelection')]")]
        internal IWebElement SelectedTrendLabel;

        [FindsBy(How = How.XPath, Using = "//div[contains(@class,'li-summary-item')]")]
        internal IList<IWebElement> FilterLabels { get; set; }

        [FindsBy(How = How.XPath, Using = "//div[@filter-id='filterId']//span[@resource-key='Explorer_Filter_CategoryLabel']")]
        internal IList<IWebElement> FilterYourGroupBy { get; set; }

        [FindsBy(How = How.XPath, Using = "//div[contains(@class,'advanced-filter-ex__bucket')]//div[contains(@class,'text')]")]
        internal IList<IWebElement> FilterYourGroupByAdvanceOption { get; set; }

        [FindsBy(How = How.XPath, Using = "//div[contains(@class,'advanced-filter-ex__bucket')]//span")]
        internal IList<IWebElement> FilterYourGroupByAdvanceOptionItem { get; set; }

        [FindsBy(How = How.XPath, Using = "//div[@id='FilterGroupId']//a")]
        internal IWebElement WhatGroupWouldYouLikeToLook;

        [FindsBy(How = How.XPath, Using = "//a[@ng-click='vm.openGraphOptions()']")]
        internal IWebElement WhatGroupWouldYouLikeToLookThrive;

        [FindsBy(How = How.XPath, Using = "//div[contains(@class,'filter-group-hierarchy')]//div[contains(@class,'display--inline-block')]")]
        internal IList<IWebElement> WhatGroupWouldYouLikeToLookThriveList { get; set; }

        [FindsBy(How = How.XPath, Using = " //div[@id='FilterGroupId']//input")]
        internal IWebElement WhatGroupWouldYouLikeToLookInput;

        [FindsBy(How = How.XPath, Using = "//div[@id='FilterGroupId']//div[@class='advanced-filter-ex__bucket']")]
        internal IWebElement WhatGroupWouldYouLikeToLookResults { get; set; }

        [FindsBy(How = How.XPath, Using = "//div[@id='FilterGroupId']//div[contains(@class,'advanced-filter-ex__bucket-item')]")]
        internal IList<IWebElement> WhatGroupWouldYouLikeToLookResultsList { get; set; }

        [FindsBy(How = How.XPath, Using = "(//input[@name='selectAllDescendants'])[2]")]
        internal IWebElement SelectItemsOnly;


        //div[contains(@class,'advanced-filter-ex__bucket')]//div[contains(@class,'text')]


        //init elements
        public FilterGroupPage(IWebDriver driver)
        {
            this.driver = driver;
            PageFactory.InitElements(driver, this);
        }
    }
}
