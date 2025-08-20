// src/features/avatar-control/components/avatar.jsx
'use client';

import { useAvatarEmotion } from '../hooks/use-avatar-emotion';

export const Avatar = ({ emotion, onMouseEnter, onMouseLeave }) => {
  const { handleMouseEnter, handleMouseLeave } = useAvatarEmotion({
    emotion,
    onMouseEnter,
    onMouseLeave
  });

  return (
    <div className='flex items-center justify-center rounded-full bg-white 
                    shadow-[0_0_20px_rgba(0,0,0,0.1)] overflow-hidden 
                    w-[150px] h-[150px] 
                    sm:w-[200px] sm:h-[200px] 
                    md:w-[250px] md:h-[250px] 
                    lg:w-[500px] lg:h-[500px] 
                    2xl:w-[600px] 2xl:h-[600px]'>
      <div className="avatar-glow"></div>
      <div 
        className={`cat-avatar ${emotion}`}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <svg width="500" height="300" viewBox="0 0 71 62" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Левые уши */}
          <path d="M7.597 8.13483C9.76357 4.81074 34.1349 13.752 26.3294 16.0585C18.5238 18.365 17.1843 20.0099 13.2675 25.9394C9.35072 31.869 5.43043 11.4589 7.597 8.13483Z" fill="#BFA72E"/>
          <path d="M9.36364 9.97657C11.1524 7.16625 32.2833 15.3831 25.6282 17.1959C18.9731 19.0087 17.8582 20.3935 14.6226 25.4055C11.387 30.4174 7.57483 12.7869 9.36364 9.97657Z" fill="#F3D646"/>
          
          {/* Правые уши */}
          <path d="M62.7155 7.13483C60.5489 3.81074 36.1776 12.752 43.9831 15.0585C51.7887 17.365 53.1282 19.0099 57.045 24.9394C60.9618 30.869 64.8821 10.4589 62.7155 7.13483Z" fill="#BFA72E"/>
          <path d="M60.9385 8.97657C59.1497 6.16625 38.0189 14.3831 44.674 16.1959C51.3291 18.0087 52.4439 19.3935 55.6795 24.4055C58.9151 29.4174 62.7273 11.7869 60.9385 8.97657Z" fill="#F3D646"/>
          
          {/* Голова */}
          <g filter="url(#filter0_i_0_1)">
            <path d="M62 40.5C56.5 58 50.5 57 35.54 62C21 58.5 12.46 54 9 40.5C9 25.036 20.0761 12.5 35.54 12.5C51.004 12.5 62 25.036 62 40.5Z" fill="#FFD712"/>
          </g>
          
          {/* Левые усы */}
          <path d="M23.0264 41.0013C23.0264 41.0013 16.9509 39.9582 13.0264 40.0013C9.49023 40.0402 4.02637 41.0013 4.02637 41.0013" stroke="black" strokeLinecap="round"/>
          <path d="M23.0264 43C23.0264 43 16.905 42.2733 12.988 42.5198C9.45864 42.742 4.05196 43.9851 4.05196 43.9851" stroke="black" strokeLinecap="round"/>
          <path d="M23.02 44.6438C23.02 44.6438 16.8756 44.1468 12.9706 44.5398C9.45207 44.8939 4.09571 46.3386 4.09571 46.3386" stroke="black" strokeLinecap="round"/>
          
          {/* Правые усы */}
          <path d="M47 41.0013C47 41.0013 53.0755 39.9582 57 40.0013C60.5361 40.0402 66 41.0013 66 41.0013" stroke="black" strokeLinecap="round"/>
          <path d="M47 43C47 43 53.1214 42.2733 57.0384 42.5198C60.5677 42.742 65.9744 43.9851 65.9744 43.9851" stroke="black" strokeLinecap="round"/>
          <path d="M47.0064 44.6438C47.0064 44.6438 53.1507 44.1468 57.0557 44.5398C60.5743 44.8939 65.9307 46.3386 65.9307 46.3386" stroke="black" strokeLinecap="round"/>
          
          <g className="eyes">
            {emotion === 'love' ? (
              <>
                <path 
                  d="M22 30 Q24.5 25 27 30" 
                  stroke="black" 
                  strokeWidth="2" 
                  fill="none" 
                  className="eye"
                />
                <path 
                  d="M43 30 Q45.5 25 48 30" 
                  stroke="black" 
                  strokeWidth="2" 
                  fill="none" 
                  className="eye"
                />
              </>
            ) : (
              <>
                <ellipse 
                  cx="24.5" 
                  cy="31" 
                  rx="3.5" 
                  ry={emotion === 'blink' ? "0.5" : emotion === 'laughing' ? "2" : "5"} 
                  fill="black" 
                  className="eye"
                />
                <ellipse 
                  cx="45.5" 
                  cy="31" 
                  rx="3.5" 
                  ry={emotion === 'blink' ? "0.5" : emotion === 'laughing' ? "2" : "5"} 
                  fill="black" 
                  className="eye"
                />
              </>
            )}
          </g>
          
          {/* Брови */}
          <g className="eyebrows">
            {emotion === 'angry' ? (
              <>
                <path 
                  d="M29 24L20 22" 
                  stroke="black" 
                  strokeWidth="2" 
                  strokeLinecap="round" 
                  className="brow angry"
                />
                <path 
                  d="M50 22L41 24" 
                  stroke="black" 
                  strokeWidth="2" 
                  strokeLinecap="round" 
                  className="brow angry"
                />
              </>
            ) : emotion === 'sad' ? (
              <>
                <path 
                  d="M20 24L29 22" 
                  stroke="black" 
                  strokeWidth="2" 
                  strokeLinecap="round" 
                  className="brow sad"
                />
                <path 
                  d="M41 22L50 24" 
                  stroke="black" 
                  strokeWidth="2" 
                  strokeLinecap="round" 
                  className="brow sad"
                />
              </>
            ) : emotion === 'happy' ? (
              <>
                <path 
                  d="M20 25C22 22 27 22 29 25" 
                  stroke="black" 
                  strokeWidth="2" 
                  strokeLinecap="round"
                  className="brow happy"
                />
                <path 
                  d="M41 25C43 22 48 22 50 25" 
                  stroke="black" 
                  strokeWidth="2" 
                  strokeLinecap="round"
                  className="brow happy"
                />
              </>
            ) : (
              <>
                <path 
                  d="M20 25C22 22 27 22 29 25" 
                  stroke="black" 
                  strokeWidth="2" 
                  strokeLinecap="round"
                  className="brow neutral"
                />
                <path 
                  d="M41 25C43 22 48 22 50 25" 
                  stroke="black" 
                  strokeWidth="2" 
                  strokeLinecap="round"
                  className="brow neutral"
                />
              </>
            )}
          </g>
          
          {/* Нос */}
          <path 
            d="M40 38.5C40 39.8807 37.6569 42.5 36 42.5C34.3431 42.5 32 39.8807 32 38.5C32 37.1193 34.3431 36 36 36C37.6569 36 40 37.1193 40 38.5Z" 
            fill="black"
          />
          
          {/* Рот с разными выражениями */}
          {(!['sad', 'angry'].includes(emotion)) && (
            <path 
              d="M27 50.5C27 50.5 32.4637 51.5 36 51.5C39.5363 51.5 45 50.5 45 50.5" 
              stroke="black" 
              strokeWidth="2" 
              className="mouth neutral"
            />
          )}
          
          {emotion === 'sad' && (
            <>
              <path 
                d="M27 50.5C27 50.5 32.4637 47.5 36 47.5C39.5363 47.5 45 50.5 45 50.5" 
                stroke="black" 
                strokeWidth="2" 
                className="mouth sad"
              />
              <circle cx="24.5" cy="35" r="1.5" fill="#48DBFB" className="tear-drop left" />
              <circle cx="45.5" cy="35" r="1.5" fill="#48DBFB" className="tear-drop right" />
            </>
          )}
          
          {emotion === 'angry' && (
            <path 
              d="M27 52.5C27 52.5 32.4637 49.5 36 49.5C39.5363 49.5 45 52.5 45 52.5" 
              stroke="black" 
              strokeWidth="2" 
              className="mouth angry"
            />
          )}
          
          {(emotion === 'neutral' || emotion === 'blink' || emotion === 'curious') && (
            <path 
              d="M27 50.5C27 50.5 32.4637 51.5 36 51.5C39.5363 51.5 45 50.5 45 50.5" 
              stroke="black" 
              strokeWidth="2" 
              className="mouth neutral"
            />
          )}
          
          {/* Фильтр для тени головы */}
          <defs>
            <filter id="filter0_i_0_1" x="9" y="9.5" width="54" height="52.5" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
              <feFlood floodOpacity="0" result="BackgroundImageFix"/>
              <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
              <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
              <feOffset dx="1" dy="-3"/>
              <feGaussianBlur stdDeviation="9.25"/>
              <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1"/>
              <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"/>
              <feBlend mode="normal" in2="shape" result="effect1_innerShadow_0_1"/>
            </filter>
          </defs>
        </svg>
        
        {emotion === 'love' && (
          <div className="hearts-container">
            <div className="heart heart-mouth">❤</div>
            <div className="heart heart-nose">❤</div>
            <div className="heart heart-eyes">❤</div>
          </div>
        )}
      </div>
    </div>
  );
};
