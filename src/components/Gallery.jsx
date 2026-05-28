import React, { useState } from 'react';
import './Gallery.css';

function Gallery() {
  const [selectedImage, setSelectedImage] = useState(null);

  // Your beautiful photos collection
  const photos = [
    {
      id: 1,
      title: 'My fav pict of you',
      description: 'Idky but everytime i see this pict i just feel so happy.. idk i thinks its bcs ur smile idk im just happy when i see ur smile in this pict',
      url: '/images/D5512051-7F06-4202-9310-6D67C4CB9B6A_1_105_c.jpeg'
    },
    {
      id: 2,
      title: 'Well everyone knows hes my cousin ',
      description: 'My dino is ssooo cute right righttt.. this is prolly be my fav pict of him too',
      url: '/images/Screenshot 2026-01-19 at 20.13.30.png'
    },
    {
      id: 3,
      title: 'Blonde Angel',
      description: 'u look cuter with that hairrr yelena.. u look soo pretty',
      url: '/images/Screenshot 2026-01-19 at 20.13.38.png'
    },
    {
      id: 4,
      title: 'STINKY MINNIONNN',
      description: 'JUST GOT THIS PICT TODAYYYJFALJFAL... well even tho i had to asked her 2 times to sent the pict but eventually i got it',
      url: '/images/Screenshot 2026-01-27 at 18.11.29.png'
    },
    {
      id: 5,
      title: 'Our first pict together in genshin',
      description: 'Thanks for introduced me to genshin stinky its soo funn',
      url: '/images/20251231193016.png'
    },
    {
      id: 6,
      title: 'An Angel',
      description: 'U deserve to be drawnn bcs ur soo pretty',
      url: '/images/IMG-20260113-WA0030.webp'
    },
    {
      id: 7,
      title: 'Cutiess',
      description: 'u gusy look so cutee in this pictt hehehe',
      url: '/images/IMG_3359.jpg'
    },
    {
      id: 8,
      title: 'Photobooth in roblox',
      description: 'Our first time doing photobooth in roblox hehe but uk the system is trashh ughh but at least we got photo together',
      url: '/images/Screenshot 2026-01-27 at 19.04.22.png'
    },
    {
      id: 9,
      title: 'My catttt',
      description: 'Thats my cat perioddd..',
      url: '/images/Screenshot_2025-12-12_at_12.29.41.png'
    },
    {
      id: 10,
      title: 'Psycopathhhh ajfljaljf',
      description: 'stinkyy poor that froggg ughhh',
      url: '/images/psycho.png'
    },
    {
      id: 11,
      title: 'Ur fav gif right rightt',
      description: 'idky everythime i sent u this gif u seem so happy 🥺',
      url: '/images/Screenshot 2026-01-27 at 19.05.39.png'
    },
    {
      id: 12,
      title: 'pict before party 1',
      description: 'always amazed by ur beauty baby',
      url: '/images/12.jpeg'
    },
    {
      id: 13,
      title: 'pict before party 2',
      description: 'its enough baby everyone can see the tattoo',
      url: '/images/17.jpg'
    },
    {
      id: 14,
      title: 'wanzenn and zenaaaaaaa',
      description: 'i wish i could hug u both, i wish could be a perfect man for u both',
      url: '/images/14.jpeg'
    },

    {
      id: 15,
      title: '1st photo together',
      description: 'she will hate it bcs she hates ai generated pict so badd',
      url: '/images/16.jpg'
    },
    {
      id: 17,
      title: 'laughed at this pict',
      description: 'so this is how straight yelena looks 🫨',
      url: '/images/18.jpg'
    },

  ];

  return (
    <div className="gallery-container">
      <h2 className="gallery-title">🖼️ Yelena's Photo Gallery 🖼️</h2>
      <p className="gallery-subtitle">hehe idk what to say</p>
      
      <div className="gallery-grid">
        {photos.map((photo) => (
          <div
            key={photo.id}
            className="gallery-item"
            onClick={() => setSelectedImage(photo)}
          >
            <div className="gallery-image-wrapper">
              <img src={photo.url} alt={photo.title} className="gallery-image" />
              <div className="gallery-overlay">
                <div className="gallery-info">
                  <h3>{photo.title}</h3>
                  <p>{photo.description}</p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {selectedImage && (
        <div className="modal" onClick={() => setSelectedImage(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="close-btn" onClick={() => setSelectedImage(null)}>
              ✕
            </button>
            <img src={selectedImage.url} alt={selectedImage.title} className="modal-image" />
            <div className="modal-info">
              <h2>{selectedImage.title}</h2>
              <p>{selectedImage.description}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Gallery;
