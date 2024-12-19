// import React from 'react';

import './stores-page.styles.scss';

import storeImage  from '../../img/stores/store1.jpeg';
import { stores } from '../../services/stores/stores.component';



const StoresPage = ({ language='sl' }) => {
  const texts = {
    en: { title: 'Our Stores', message: 'Find stores near you.' },
    sl: { title: 'Naše trgovine', message: 'Poiščite trgovine v vaši bližini.' },
  };
  const  xtitle = language === 'sl' ? "Sporočila" : "Messages";
  // console.log(stores);

  const notificationsForStore = (store) => {
    return language === 'sl' ? store.notifications.sl : store.notifications.en;
  };

  
  return (
    <>


    <div className="container my-5">
      <h1 className="mb-4">{texts[language].title}</h1>
      <p>{texts[language].message}</p>
   
      <div className="row g-4">
           
  
                {stores.map((store) => {
          const messagesSelLanguage = notificationsForStore(store);
          return (
            <div className="col-md-4" key={store.id}>
              <div className="card h-100">
                <div className="card-body">
                <div>
                 <img src={storeImage} alt={store.name} title ={store.name} />
                </div>
                  <h2 className="card-title">{store.name}</h2>
                  <p><strong>Naslov:</strong> {store.address}</p>
                  <p><strong>Delovni čas:</strong> {store.workingHours}</p>
                  <p><strong>Kontakt:</strong> {store.contact.email}, {store.contact.phone}</p>
                  <div className="manager-info d-flex align-items-center mb-3">
                    <img 
                      src={store.managerImage} 
                      alt={store.managerName} 
                      className="manager-image me-3" 
                      style={{ width: '50px', height: '50px', objectFit: 'cover', borderRadius: '50%' }}
                    />
                    <span><strong>Vodja poslovalnice:</strong> {store.managerName}</span>
                  </div>
                  <p>
                  <strong>{language === 'sl' ? 'Lokacija:' : 'Location:'} </strong>
                    <a href={store.googleMapsLink} target="_blank" rel="noopener noreferrer">
                      Oglej si na Google Maps
                    </a>
                  </p>

                  <hr />
                  <h4>{xtitle}</h4>
                  {messagesSelLanguage.length > 0 ? (
                    <ul className="list-unstyled">
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