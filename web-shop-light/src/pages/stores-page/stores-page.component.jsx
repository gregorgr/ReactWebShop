// import React from 'react';
import { useTranslation } from 'react-i18next';
import './stores-page.styles.scss';


import { stores } from '../../services/stores/stores.component';

import storeImage  from '../../img/stores/store1.jpeg';
import storeManager  from '../../img/stores/janez-novak.jpg';

const StoresPage = ({ language='sl' }) => {
// import { useTranslation } from 'react-i18next';
   const { t, i18n } = useTranslation();
    const currentLanguage = i18n.language; // Trenutni jezik
  const texts = {
    en: { title: 'Our Stores', message: 'Find stores near you.' },
    sl: { title: 'Naše trgovine', message: 'Poiščite trgovine v vaši bližini.' },
  };
  language = currentLanguage;
  const  xtitle = currentLanguage  === 'sl' ? "Sporočila trgovine" : "Store Notifications";
  // console.log(stores);

  const notificationsForStore = (store) => {
    return currentLanguage  === 'sl' ? store.notifications.sl : store.notifications.en;
  };

  
  return (
    <>


<div className="store-page">
      <h1 className="mb-4 text-center">{currentLanguage === 'sl' ? 'Naše Poslovalnice' : 'Our Stores'}</h1>
      <div className="row g-0">
        {stores.map((store) => {

     const messagesSelLanguage = notificationsForStore(store);

     const lat = store.latitude;
     const lng = store.longitude;
     const delta = 0.01; 
     // Bbox: minLon, minLat, maxLon, maxLat
     const minLon = lng - delta;
     const minLat = lat - delta;
     const maxLon = lng + delta;
     const maxLat = lat + delta;
     const bbox = [minLon, minLat, maxLon, maxLat].join('%2C');
     // Marker: lat,lon
     const marker = `${lat}%2C${lng}`;
     const osmUrl = `https://www.openstreetmap.org/export/embed.html?bbox=${bbox}&marker=${marker}&layer=M`;

          return (
            <div className="col-md-3" key={store.id}>
              <div className="card h-100 border-1">
                <div className="card-body">
                  <div className="card-image">
                    <img src={storeImage} alt={store.name} title={store.name} />
                  </div>
                  <h2 className="card-title">{store.name}</h2>
                  <div className="card-box">

                  <p><strong>{language === 'sl' ? 'Naslov' : 'Address'}:</strong> {store.address}</p>
                  <p><strong>{language === 'sl' ? 'Delovni čas' : 'Working Hours'}:</strong> {store.workingHours}</p>
                  <p><strong>{language === 'sl' ? 'Kontakt' : 'Contact'}:</strong> {store.contact.email}, {store.contact.phone}</p>
                  <div className="manager-info d-flex align-items-center mb-3">
                    <img 
                      src={storeManager} //{store.managerImage}  //
                      alt={store.managerName} 
                      className="manager-image me-3" 
                      style={{ width: '50px', height: '50px', objectFit: 'cover', borderRadius: '50%' }}
                    />
                    <span><strong>{language === 'sl' ? 'Vodja poslovalnice' : 'Store Manager'}:</strong> {store.managerName}</span>
                  </div>
                  </div>
                 
                

                  <strong>{language === 'sl' ? 'Lokacija:' : 'Location:'}</strong>
                  <div style={{width: '100%', height: '200px', border: '1px solid #ccc', marginBottom: '15px'}}>
                    <iframe 
                      width="100%" 
                      height="100%" 
                      frameBorder="0" 
                      scrolling="no" 
                      marginHeight="0" 
                      marginWidth="0"
                      src={osmUrl} 
                      title="Store Location"
                    ></iframe>
                  </div>

                  <hr />
                  <h4 className='store-messages'>{xtitle}:</h4>
                  {messagesSelLanguage.length > 0 ? (
                    <ul className="list-unstyled store-messages">
                      {messagesSelLanguage.map((note, idx) => (
                        <li key={idx} className="mb-3">
                          <strong>{note.title}</strong><br/>
                          <small>
                            {note.date} {language === 'sl' ? 'ob' : 'at'} {note.time}
                          </small><br/>
                          {note.content}
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p>{language === 'sl' ? 'Trenutno ni obvestil.' : 'No notifications at the moment.'}</p>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
     </>
  );
};

export default StoresPage;