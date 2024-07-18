// src/react-timeago.d.ts

declare module 'react-timeago' {
    import * as React from 'react';
  
    interface TimeAgoProps {
      date: Date | string | number;
      live?: boolean;
      format?: string | ((date: Date) => string);
      locale?: string;
      timeStyle?: string;
    }
  
    const TimeAgo: React.FC<TimeAgoProps>;
  
    export default TimeAgo;
  }
  