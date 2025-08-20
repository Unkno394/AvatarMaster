export default function SadCat() {
    return (
      <div className="cat-avatar sad w-[200px] h-[200px] sm:w-[300px] sm:h-[300px]">
        <svg width="100%" height="100%" viewBox="0 0 71 62" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Уши */}
          <path d="M7.597 8.13483C9.76357 4.81074 34.1349 13.752 26.3294 16.0585C18.5238 18.365 17.1843 20.0099 13.2675 25.9394C9.35072 31.869 5.43043 11.4589 7.597 8.13483Z" fill="#BFA72E"/>
          <path d="M9.36364 9.97657C11.1524 7.16625 32.2833 15.3831 25.6282 17.1959C18.9731 19.0087 17.8582 20.3935 14.6226 25.4055C11.387 30.4174 7.57483 12.7869 9.36364 9.97657Z" fill="#F3D646"/>
          <path d="M62.7155 7.13483C60.5489 3.81074 36.1776 12.752 43.9831 15.0585C51.7887 17.365 53.1282 19.0099 57.045 24.9394C60.9618 30.869 64.8821 10.4589 62.7155 7.13483Z" fill="#BFA72E"/>
          <path d="M60.9385 8.97657C59.1497 6.16625 38.0189 14.3831 44.674 16.1959C51.3291 18.0087 52.4439 19.3935 55.6795 24.4055C58.9151 29.4174 62.7273 11.7869 60.9385 8.97657Z" fill="#F3D646"/>
          
          {/* Голова */}
          <path d="M62 40.5C56.5 58 50.5 57 35.54 62C21 58.5 12.46 54 9 40.5C9 25.036 20.0761 12.5 35.54 12.5C51.004 12.5 62 25.036 62 40.5Z" fill="#FFD712"/>
          
          {/* Усы */}
          <path d="M23.0264 41.0013C23.0264 41.0013 16.9509 39.9582 13.0264 40.0013C9.49023 40.0402 4.02637 41.0013 4.02637 41.0013" stroke="black" strokeLinecap="round"/>
          <path d="M23.0264 43C23.0264 43 16.905 42.2733 12.988 42.5198C9.45864 42.742 4.05196 43.9851 4.05196 43.9851" stroke="black" strokeLinecap="round"/>
          <path d="M23.02 44.6438C23.02 44.6438 16.8756 44.1468 12.9706 44.5398C9.45207 44.8939 4.09571 46.3386 4.09571 46.3386" stroke="black" strokeLinecap="round"/>
          <path d="M47 41.0013C47 41.0013 53.0755 39.9582 57 40.0013C60.5361 40.0402 66 41.0013 66 41.0013" stroke="black" strokeLinecap="round"/>
          <path d="M47 43C47 43 53.1214 42.2733 57.0384 42.5198C60.5677 42.742 65.9744 43.9851 65.9744 43.9851" stroke="black" strokeLinecap="round"/>
          <path d="M47.0064 44.6438C47.0064 44.6438 53.1507 44.1468 57.0557 44.5398C60.5743 44.8939 65.9307 46.3386 65.9307 46.3386" stroke="black" strokeLinecap="round"/>
          
          {/* Глаза */}
          <ellipse cx="24.5" cy="31" rx="3.5" ry="5" fill="black" className="eye"/>
          <ellipse cx="45.5" cy="31" rx="3.5" ry="5" fill="black" className="eye"/>
          
          {/* Брови */}
          <path d="M20 24L29 22" stroke="black" strokeWidth="2" strokeLinecap="round" className="brow"/>
          <path d="M41 22L50 24" stroke="black" strokeWidth="2" strokeLinecap="round" className="brow"/>
          
          {/* Нос */}
          <path d="M40 38.5C40 39.8807 37.6569 42.5 36 42.5C34.3431 42.5 32 39.8807 32 38.5C32 37.1193 34.3431 36 36 36C37.6569 36 40 37.1193 40 38.5Z" fill="black"/>
          
          {/* Рот */}
          <path 
            d="M27 50.5C27 50.5 32.4637 47.5 36 47.5C39.5363 47.5 45 50.5 45 50.5" 
            stroke="black" 
            strokeWidth="2" 
            strokeLinecap="round"
            className="mouth sad"
          />
          
          {/* Слёзы */}
          <circle cx="24.5" cy="35" r="1.5" fill="#48DBFB" className="tear-drop left"/>
          <circle cx="45.5" cy="35" r="1.5" fill="#48DBFB" className="tear-drop right"/>
        </svg>
      </div>
    );
  }
  