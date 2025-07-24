'use client';

import { useEffect, useRef } from 'react';

type InstagramEmbedProps = {
  url: string;
  maxWidth?: number;
};

const InstagramEmbed: React.FC<InstagramEmbedProps> = ({ url, maxWidth = 540 }) => {
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const script = document.createElement('script');
    script.setAttribute('src', '//www.instagram.com/embed.js');
    script.setAttribute('async', '');
    script.setAttribute('defer', '');
    ref.current?.appendChild(script);
  }, []);

  return (
    <div ref={ref}>
      <blockquote
        className="instagram-media"
        data-instgrm-permalink={url}
        data-instgrm-version="14"
        style={{
          background: '#FFF',
          border: 0,
          borderRadius: 3,
          boxShadow: '0 0 1px 0 rgba(0,0,0,0.5),0 1px 10px 0 rgba(0,0,0,0.15)',
          margin: '1px',
          maxWidth: `${maxWidth}px`,
          minWidth: '326px',
          padding: 0,
          width: '100%',
        }}
      />
    </div>
  );
};

export default InstagramEmbed;
