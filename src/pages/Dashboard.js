import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import NewCampaign from '../pages/NewCampaign'; // Import the NewCampaign component
import './Dashboard.css';

const Dashboard = () => {
  const [selectAll, setSelectAll] = useState(false);
  const [activeTab, setActiveTab] = useState('campaign'); // Manage active tab
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const campaigns = [
    {
      id: 1,
      name: 'Campaign 1',
      status: 'Active',
      adFormat: 'Push',
      type: 'CPC',
      bid: 50,
      impressions: 10000,
      clicks: 150,
      conv: 30,
      ctr: 1.5,
      cpa: 10,
      ecpc: 3.33,
      ecpm: 5,
      cost: 500,
      dailyBudget: 1000,
      totalBudget: 5000,
      startDate: '2024-12-01',
    },
    {
      id: 2,
      name: 'Campaign 2',
      status: 'Paused',
      adFormat: 'On Click',
      type: 'CPM',
      bid: 40,
      impressions: 15000,
      clicks: 200,
      conv: 40,
      ctr: 1.33,
      cpa: 12,
      ecpc: 4,
      ecpm: 6,
      cost: 600,
      dailyBudget: 1200,
      totalBudget: 6000,
      startDate: '2024-11-15',
    },
  ];

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className="dashboard">
      {/* Sidebar */}
      <div className={`sidebar ${sidebarOpen ? 'open' : ''}`}>
        <button className="sidebar-toggle" onClick={toggleSidebar}>
          ☰
        </button>
        <h2>RollerAds</h2>
        <button
          className="new-campaign-btn"
          onClick={() => handleTabClick('newCampaign')}
        >
          + New Campaign
        </button>
        <ul>
          <li
            className={activeTab === 'campaign' ? 'active' : ''}
            onClick={() => handleTabClick('campaign')}
          >
            Campaigns
          </li>
          <li
            className={activeTab === 'reports' ? 'active' : ''}
            onClick={() => handleTabClick('reports')}
          >
            Reports
          </li>
        </ul>
      </div>

      <div className="main-content">
        {activeTab === 'campaign' && (
          <>
            <h2>Campaigns</h2>
            <div className="campaign-table">
              <table>
                <thead>
                  <tr>
                    <th>
                      <input
                        type="checkbox"
                        checked={selectAll}
                        onChange={() => setSelectAll(!selectAll)}
                      />
                    </th>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Status</th>
                    <th>Ad Format</th>
                    <th>Type</th>
                    <th>Bid</th>
                    <th>Impressions</th>
                    <th>Clicks</th>
                    <th>Conv.</th>
                    <th>CTR</th>
                    <th>CPA</th>
                    <th>eCPC</th>
                    <th>eCPM</th>
                    <th>Cost</th>
                    <th>Daily Budget</th>
                    <th>Total Budget</th>
                    <th>Start Date</th>
                  </tr>
                </thead>
                <tbody>
                  {campaigns.length > 0 ? (
                    campaigns.map((campaign) => (
                      <tr key={campaign.id}>
                        <td>
                          <input
                            type="checkbox"
                            checked={selectAll}
                            onChange={() => setSelectAll(!selectAll)}
                          />
                        </td>
                        <td>{campaign.id}</td>
                        <td>{campaign.name}</td>
                        <td>{campaign.status}</td>
                        <td>{campaign.adFormat}</td>
                        <td>{campaign.type}</td>
                        <td>{campaign.bid}</td>
                        <td>{campaign.impressions}</td>
                        <td>{campaign.clicks}</td>
                        <td>{campaign.conv}</td>
                        <td>{campaign.ctr}</td>
                        <td>{campaign.cpa}</td>
                        <td>{campaign.ecpc}</td>
                        <td>{campaign.ecpm}</td>
                        <td>{campaign.cost}</td>
                        <td>{campaign.dailyBudget}</td>
                        <td>{campaign.totalBudget}</td>
                        <td>{campaign.startDate}</td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="18">No campaigns found.</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </>
        )}

        {activeTab === 'newCampaign' && <NewCampaign />}
      </div>
    </div>
  );
};

export default Dashboard;
