import React, { useState } from 'react';
import '../pages/NewCampaign.css';

const NewCampaign = () => {
  const [selectedFormat, setSelectedFormat] = useState('');
  const [selectedBidModel, setSelectedBidModel] = useState('');
  const [trafficPresetInfo, setTrafficPresetInfo] = useState(false);
  const [creativePreview, setCreativePreview] = useState('');
  const [countries, setCountries] = useState([]); // Populate this with country data
  const [biddingValue, setBiddingValue] = useState(50); // State for the bidding range
  const [maxCpc, setMaxCpc] = useState('');
  const [customBids, setCustomBids] = useState([{ cpc: '', zone: '', feed: '' }]);
  const [selectedLimit, setSelectedLimit] = useState('');


  const handleInfoHover = () => setTrafficPresetInfo(!trafficPresetInfo);
  const handleCreativePreviewChange = (os) => setCreativePreview(os);

  // Handle adding a custom bid
  const addCustomBid = () => {
    setCustomBids([...customBids, { cpc: '', zone: '', feed: '' }]);
  };

  // Handle removing a custom bid
  const removeCustomBid = (index) => {
    const newCustomBids = customBids.filter((_, i) => i !== index);
    setCustomBids(newCustomBids);
  };

  const handleLimitChange = (e) => {
    setSelectedLimit(e.target.value);
  };

  const selectWorkdays = () => {
    const workdays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'];
    const dayColumns = document.querySelectorAll('.day-row');
    dayColumns.forEach((day, index) => {
      if (workdays.includes(day.children[0].textContent)) {
        const checkboxes = day.querySelectorAll('.time-slot');
        checkboxes.forEach((checkbox) => checkbox.checked = true);
      }
    });
  };
  
  const selectWorkweek = () => {
    const workweek = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'];
    const dayColumns = document.querySelectorAll('.day-row');
    dayColumns.forEach((day, index) => {
      if (workweek.includes(day.children[0].textContent)) {
        const checkboxes = day.querySelectorAll('.time-slot');
        checkboxes.forEach((checkbox) => checkbox.checked = true);
      }
    });
  };

  const [os, setOs] = useState('windows');
const [osVersions, setOsVersions] = useState({
  windows: ['Windows 10', 'Windows 11'],
  macos: ['MacOS Monterey', 'MacOS Big Sur'],
  android: ['Android 10', 'Android 11', 'Android 12'],
  chromeos: ['Chrome OS 94', 'Chrome OS 95'],
  linux: ['Ubuntu 20.04', 'Debian 10', 'CentOS 7'],
});

const handleOsChange = (event) => {
  const selectedOs = event.target.value;
  setOs(selectedOs);
};
  
  const clearSelections = () => {
    const allCheckboxes = document.querySelectorAll('.time-slot');
    allCheckboxes.forEach((checkbox) => checkbox.checked = false);
  };
  
  const fetchTimeZones = async () => {
    const response = await fetch('https://worldtimeapi.org/api/timezone');
    const timeZones = await response.json();
    return timeZones.map((tz) => <option value={tz}>{tz}</option>);
  };

  const [browser, setBrowser] = useState('chrome');
const [browserVersions, setBrowserVersions] = useState({
  chrome: ['Version 1', 'Version 2', 'Version 3'],
  firefox: ['Version 1', 'Version 2', 'Version 3'],
  safari: ['Version 1', 'Version 2'],
  edge: ['Version 1', 'Version 2'],
  opera: ['Version 1'],
});

const handleBrowserChange = (event) => {
  setBrowser(event.target.value);
};

const [isFormComplete, setIsFormComplete] = useState(false);

// Function to check if the form is filled
const checkFormCompletion = () => {
  const isCampaignNameFilled = document.querySelector('input[type="text"][placeholder="Enter campaign name"]').value !== '';
  const isTargetUrlFilled = document.querySelector('input[type="url"][placeholder="Enter target URL"]').value !== '';
  const isTitleFilled = document.querySelector('input[type="text"][placeholder="Enter title"]').value !== '';
  const isCreativeModeSelected = document.querySelector('input[name="creativeMode"]:checked') !== null;
  const isFormatSelected = selectedFormat !== '';
  const isBidModelSelected = selectedBidModel !== '';
  const isCountrySelected = document.querySelector('select')?.value !== '';
  const isMaxCpcValid = maxCpc !== ''; // Optional check for Max CPC if you want to validate

  // Add more checks for other fields if needed

  const formFilled =
    isCampaignNameFilled &&
    isTargetUrlFilled &&
    isTitleFilled &&
    isCreativeModeSelected &&
    isFormatSelected &&
    isBidModelSelected &&
    isCountrySelected;

  setIsFormComplete(formFilled);
};

// Trigger this function whenever a form input changes
const handleStartCampaign = () => {
  if (isFormComplete) {
    // Submit form data
  } else {
    alert('Please complete the form before starting the campaign.');
  }
};


  return (
    <div className="new-campaign-form">
      {/* Format and Bid Model Section */}
      <div className="radio-group">
        <h3>Format</h3>
        <label><input type="radio" name="format" value="Push" onChange={(e) => setSelectedFormat(e.target.value)} /> Push</label>
        <label><input type="radio" name="format" value="Onclick" onChange={(e) => setSelectedFormat(e.target.value)} /> Onclick</label>
        <label><input type="radio" name="format" value="InPage" onChange={(e) => setSelectedFormat(e.target.value)} /> InPage</label>
      </div>

      <div className="radio-group">
        <h3>Bid Model</h3>
        <label><input type="radio" name="bidModel" value="SmartCPC" onChange={(e) => setSelectedBidModel(e.target.value)} /> SmartCPC</label>
        <label><input type="radio" name="bidModel" value="CPC" onChange={(e) => setSelectedBidModel(e.target.value)} /> CPC</label>
      </div>

      {/* Traffic Presets Section */}
      <div className="container">
        <h3>Traffic Presets</h3>
        <span className="info-icon" onMouseEnter={handleInfoHover} onMouseLeave={handleInfoHover}>ℹ️</span>
        {trafficPresetInfo && <div className="tooltip">Info about traffic presets...</div>}
        <select>
          <option value="">Select Preset</option>
          <option value="Preset1">Preset 1</option>
          <option value="Preset2">Preset 2</option>
          <option value="Preset3">Preset 3</option>
        </select>
      </div>

      {/* General Information Section */}
      <div className="container">
        <h3>General</h3>
        <label>Campaign Name (Required)</label>
        <input type="text" placeholder="Enter campaign name" required />
        <label>Target URL (Required)</label>
        <input type="url" placeholder="Enter target URL" required />
      </div>

      {/* Creatives Section */}
      <div className="container">
        <h3>Creatives</h3>
        <div className="dialog-box">
          Working with software and utilities? Try auto-generated creatives! More in the blog.
        </div>
        <label><input type="radio" name="creativeMode" value="Manual" /> Manual</label>
        <label><input type="radio" name="creativeMode" value="AutoGenerated" /> Auto-generated</label>

        <label>Icon</label>
        <input type="file" accept="image/*" />
        <label>Image</label>
        <input type="file" accept="image/*" />
        <label>Emojis</label>
        <input type="text" placeholder="Select emoji" />

        <label>Title (Required)</label>
        <input type="text" placeholder="Enter title" required />

        <div className="preview-container">
          <h4>Preview</h4>
          <label><input type="radio" name="osPreview" value="Android" onChange={() => handleCreativePreviewChange('Android')} /> Android</label>
          <label><input type="radio" name="osPreview" value="Windows" onChange={() => handleCreativePreviewChange('Windows')} /> Windows</label>
          <label><input type="radio" name="osPreview" value="macOS" onChange={() => handleCreativePreviewChange('macOS')} /> macOS</label>
          {creativePreview && <div className="preview-box">Preview for {creativePreview}</div>}
        </div>
      </div>

      {/* Countries Section */}
      <div className="container">
        <h3>Countries</h3>
        <select>
          <option value="">Select Country</option>
          {countries.map((country, index) => (
            <option key={index} value={country}>{country}</option>
          ))}
        </select>
      </div>

      {/* Proxy and Regions Section */}
      <div className="container">
        <h4>Proxy</h4>
        <label><input type="radio" name="proxy" value="AllTraffic" /> All Traffic</label>
        <label><input type="radio" name="proxy" value="OnlyProxy" /> Only Proxy</label>
        <label><input type="radio" name="proxy" value="NoProxy" /> No Proxy</label>

        <h4>Regions or Cities</h4>
        <label><input type="radio" name="regionOrCity" value="Cities" /> Cities</label>
        <label><input type="radio" name="regionOrCity" value="Regions" /> Regions</label>
        <button>+ Include</button>
        <button>- Exclude</button>

        <h4>Carriers</h4>
        <select>
          <option value="Dialup">Dialup</option>
          <option value="Cable/DSL">Cable/DSL</option>
          <option value="Cellular">Cellular</option>
        </select>
        <button>+ Include</button>
        <button>- Exclude</button>

        <h4>IP Addresses</h4>
        <button>+ Include</button>
        <button>- Exclude</button>
      </div>

      {/* Bidding Strategy Section */}
      <div className="container">
        <h3>Bidding Strategy</h3>
        
        {/* Bidding Line */}
        <div className="bidding-strategy-line">
          <span>Bottom of the Auction</span>
          <input type="range" min="0" max="100" className="bidding-range" value={biddingValue} onChange={(e) => setBiddingValue(e.target.value)} />
          <span>Average Auction Price</span>
          <input type="range" min="100" max="200" className="bidding-range" />
          <span>Top of the Auction</span>
        </div>

        {/* Limits & Max Bid */}
        <div className="limits-max-bid">
          <h4>Limits & Max Bid</h4>
          <label>
              <input 
                type="radio" 
                name="limit" 
                value="NoLimits" 
                checked={selectedLimit === 'NoLimits'} 
                onChange={handleLimitChange} 
              />
              No per-zone click limits
            </label>
            <label>
              <input 
                type="radio" 
                name="limit" 
                value="NormalizedBuying" 
                checked={selectedLimit === 'NormalizedBuying'} 
                onChange={handleLimitChange} 
              />
              Normalized Buying
            </label>
            <label>
              <input 
                type="radio" 
                name="limit" 
                value="LimitPerZone" 
                checked={selectedLimit === 'LimitPerZone'} 
                onChange={handleLimitChange} 
              />
              Limit every zone
            </label>
          <div className="max-cpc">
            <label>Max CPC (Optional):</label>
            <input type="text" value={maxCpc} onChange={(e) => setMaxCpc(e.target.value)} placeholder="Enter Max CPC" />
          </div>
        </div>

        {/* Custom Bids */}
        <div className="custom-bids">
          <h4>Custom Bids</h4>
          <button onClick={addCustomBid}>+ Add Custom Bid</button>
          {customBids.map((bid, index) => (
            <div className="custom-bid-item" key={index}>
              <input type="text" placeholder="CPC" value={bid.cpc} onChange={(e) => {
                const updatedBids = [...customBids];
                updatedBids[index].cpc = e.target.value;
                setCustomBids(updatedBids);
              }} />
              <select value={bid.zone} onChange={(e) => {
                const updatedBids = [...customBids];
                updatedBids[index].zone = e.target.value;
                setCustomBids(updatedBids);
              }}>
                <option value="zones">Zones</option>
                <option value="feeds">Feeds</option>
              </select>
              <input type="text" placeholder="Zones" value={bid.zone} onChange={(e) => {
                const updatedBids = [...customBids];
                updatedBids[index].zone = e.target.value;
                setCustomBids(updatedBids);
              }} />
              <button onClick={() => removeCustomBid(index)}>Remove</button>
            </div>
          ))}
        </div>

        {/* Budget Section */}
        <div className="budget">
          <h4>Budget</h4>
          <label>Daily Budget:</label>
          <input type="text" placeholder="Enter daily budget" />
          <label>Total Budget:</label>
          <input type="text" placeholder="Enter total budget" />
        </div>

          {/* Sixth Container: Traffic, Feed Limitation, and Zone Limitation */}
<div className="container">
  {/* Traffic Section */}
  <h3>Traffic</h3>
  <div className="radio-group">
    <label>
      <input 
        type="radio" 
        name="traffic" 
        value="AllTraffic" 
        onChange={() => console.log('All Traffic selected')} 
      />
      All Traffic
    </label>
    <label>
      <input 
        type="radio" 
        name="traffic" 
        value="Premium" 
        onChange={() => console.log('Premium selected')} 
      />
      Premium
    </label>
  </div>

  {/* Subscription Age Dropdown */}
  <div className="dropdown-container">
    <label>Subscription Age</label>
    <select>
      <option value="0-3">0-3 days</option>
      <option value="4-7">4-7 days</option>
      <option value="8-15">8-15 days</option>
      <option value="16-30">16-30 days</option>
      <option value="30-60">30-60 days</option>
      <option value="60+">60+ days</option>
    </select>
  </div>

  {/* Feed Limitation Section */}
  <div className="feed-limitation">
    <h4>Feed Limitation</h4>
    <div className="button-group">
      <button>+ Include</button>
      <button>- Exclude</button>
    </div>
    <label>Feed Ids</label>
    <input type="text" placeholder="Enter Feed Ids" />
  </div>

  {/* Zone Limitation Section */}
  <div className="zone-limitation">
    <h4>Zone Limitation</h4>
    <div className="button-group">
      <button>+ Include</button>
      <button>- Exclude</button>
    </div>
    <label>Zone Ids</label>
    <input type="text" placeholder="Enter Zone Ids" />
  </div>
</div>


       {/* Seventh Container: Frequency Capping and Day and Time Targeting */}
{/* Seventh Container: Frequency Capping and Day and Time Targeting */}
<div className="container">
  {/* Frequency Capping Section */}
  <div className="frequency-capping">
    <h3>Frequency Capping</h3>
    <div className="on-off-buttons">
      <button onClick={() => console.log('Frequency Capping ON')}>On</button>
      <button onClick={() => console.log('Frequency Capping OFF')}>Off</button>
    </div>
    <div className="input-group">
      <label>Limit Clicks Frequency To</label>
      <input type="number" placeholder="Enter frequency" />
    </div>
    <div className="input-group">
      <label>Exposures Per</label>
      <input type="number" placeholder="Enter exposures" />
    </div>
    <div className="input-group">
      <label>Hours</label>
      <input type="number" placeholder="Enter hours" />
    </div>
  </div>

  {/* Day and Time Targeting Section */}
  <div className="day-time-targeting">
    <h3>Day and Time Targeting</h3>

    {/* Time Zone Dropdown */}
    <div className="time-zone-dropdown">
      <label>Time Zone</label>
      <select>
        <option value="GMT">GMT</option>
        <option value="UTC">UTC</option>
        {/* Add other time zones dynamically */}
      </select>
    </div>

    {/* Weekdays/Weekends Selection Grid */}
    <div className="time-grid">
      {/* Days (Monday to Sunday) */}
      <div className="days">
        {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day, index) => (
          <div key={index} className="day-row">
            <span>{day}</span>
            {[...Array(24)].map((_, hour) => (
              <input key={hour} type="checkbox" className="time-slot" />
            ))}
          </div>
        ))}
      </div>

      {/* Hours (0 to 23) */}
      <div className="hours">
        {[...Array(24)].map((_, hour) => (
          <span key={hour}>{hour}</span>
        ))}
      </div>
    </div>

    {/* Buttons to Select Workdays and Workweek */}
    <div className="selection-buttons">
      <button onClick={() => selectWorkdays()}>Select Workdays</button>
      <button onClick={() => selectWorkweek()}>Select Workweek</button>
      <button onClick={() => clearSelections()}>Clear All</button>
    </div>
  </div>
</div>


        {/* 8th Container: Device and Operating Systems */}
<div className="container">
  <h3>Device & Operating Systems</h3>

  {/* Device Selection */}
  <div className="device-selection">
    <label htmlFor="platform">Platform</label>
    <select id="platform" name="platform">
      <option value="mobile">Mobile</option>
      <option value="tablet">Tablet</option>
      <option value="desktop">Desktop</option>
    </select>
  </div>

  {/* Operating System Selection */}
  <div className="os-selection">
    <label htmlFor="oses">Operating Systems</label>
    <select id="oses" name="oses" onChange={handleOsChange}>
      <option value="windows">Windows</option>
      <option value="macos">MacOS</option>
      <option value="android">Android</option>
      <option value="chromeos">Chrome OS</option>
      <option value="linux">Linux</option>
    </select>
  </div>

  {/* OS Versions Dropdown */}
  <div className="os-version-selection">
    <label htmlFor="os-versions">OS Versions</label>
    <select id="os-versions" name="os-versions">
      {/* Dynamic options based on OS selection */}
      {osVersions[os] && osVersions[os].map((version, index) => (
        <option key={index} value={version}>{version}</option>
      ))}
    </select>
  </div>
</div>


      {/* 9th Container: Browser & Browser Languages */}
<div className="container">
  <h3>Browser & Browser Languages</h3>

  {/* Browser Selection */}
  <div className="browser-selection">
    <label htmlFor="browser-option">Browser</label>
    <div className="option-group">
    <button>+ Include</button>
    <button>- Exclude</button>
      <select id="browser" name="browser">
        <option value="chrome">Chrome</option>
        <option value="firefox">Firefox</option>
        <option value="safari">Safari</option>
        <option value="edge">Edge</option>
        <option value="opera">Opera</option>
      </select>
    </div>
  </div>

  {/* Browser Version Selection */}
  <div className="browser-version-selection">
    <label htmlFor="browser-version-option">Browser Versions</label>
    <div className="option-group">
    <button>+ Include</button>
    <button>- Exclude</button>
      <select id="browser-versions" name="browser-versions">
        <option value="v1">Version 1</option>
        <option value="v2">Version 2</option>
        <option value="v3">Version 3</option>
        <option value="v4">Version 4</option>
      </select>
    </div>
  </div>

  {/* Browser Languages Selection */}
  <div className="browser-language-selection">
    <label htmlFor="language-option">Browser Languages</label>
    <div className="option-group">
    <button>+ Include</button>
    <button>- Exclude</button>
      <select id="languages" name="languages">
        <option value="en">English</option>
        <option value="es">Spanish</option>
        <option value="fr">French</option>
        <option value="de">German</option>
        <option value="zh">Chinese</option>
      </select>
    </div>
  </div>
</div>


{/* 10th Container: Save Changes & Start Campaign */}
<div className="container">
  <div className="save-changes">
    <h4>Save Changes</h4>
    <input type="checkbox" id="quality-guidelines" name="quality-guidelines" />
    <label>
      I declare and guarantee that my campaign meets the Quality Guidelines.
    </label>
  </div>

  {/* Start Campaign Button */}
  <button
    id="start-campaign"
    className="start-campaign-button"
    disabled={!isFormComplete}
    onClick={handleStartCampaign}
  >
    Start Campaign
  </button>
</div>



      </div>
    </div>


          
  );
};

export default NewCampaign;
