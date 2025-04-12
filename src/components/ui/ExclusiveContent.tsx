
import React, { ReactNode } from 'react';
import { motion } from 'framer-motion';
import { Badge, ShieldCheck, Star } from 'lucide-react';

interface ExclusiveContentProps {
  children: ReactNode;
  title?: string;
  badge?: string;
  className?: string;
  icon?: 'badge' | 'shield' | 'star';
  pattern?: boolean;
}

export const ExclusiveHeading: React.FC<{
  children: ReactNode;
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
}> = ({ children, className = '', size = 'md' }) => {
  const sizeClasses = {
    sm: 'text-lg md:text-xl',
    md: 'text-xl md:text-2xl',
    lg: 'text-2xl md:text-3xl',
    xl: 'text-3xl md:text-4xl',
  };

  return (
    <h3 className={`font-serif ${sizeClasses[size]} mb-4 text-foreground dark:text-foreground-dark ${className}`}>
      {children}
    </h3>
  );
};

export const ExclusiveContent: React.FC<ExclusiveContentProps> = ({ 
  children, 
  title, 
  badge,
  className = '',
  icon = 'shield',
  pattern = true
}) => {
  const IconComponent = {
    badge: Badge,
    shield: ShieldCheck,
    star: Star
  }[icon];

  return (
    <motion.div 
      className={`legacy-card p-6 md:p-8 ${pattern ? 'bg-subtle-grid' : ''} ${className}`}
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      viewport={{ once: true, margin: "-50px" }}
    >
      {(title || badge) && (
        <div className="flex justify-between items-center mb-4">
          {title && (
            <div className="flex items-center gap-2">
              {IconComponent && (
                <span className="text-gold">
                  <IconComponent size={20} className="text-gold" />
                </span>
              )}
              <h4 className="exclusive-heading text-lg md:text-xl">{title}</h4>
            </div>
          )}
          
          {badge && (
            <span className="limited-access-tag">
              {badge}
            </span>
          )}
        </div>
      )}
      
      <div className="relative">
        {children}
      </div>
      
      <div className="heritage-divider mt-4 mb-2" />
    </motion.div>
  );
};

export const PremiumQuote: React.FC<{
  quote: string;
  author?: string;
  role?: string;
}> = ({ quote, author, role }) => {
  return (
    <blockquote className="premium-accent my-4">
      <p className="text-foreground/90 dark:text-foreground-dark/90 italic font-serif text-lg">
        "{quote}"
      </p>
      {(author || role) && (
        <footer className="mt-2 text-sm text-foreground/70 dark:text-foreground-dark/70">
          {author && <cite className="font-medium not-italic">{author}</cite>}
          {role && <span className="ml-1 not-italic">— {role}</span>}
        </footer>
      )}
    </blockquote>
  );
};

export const GoldAccentText: React.FC<{
  children: ReactNode;
  className?: string; 
}> = ({ children, className = '' }) => {
  return (
    <span className={`gold-gradient-text font-medium ${className}`}>
      {children}
    </span>
  );
};

export const ExclusiveList: React.FC<{
  items: string[];
  className?: string;
}> = ({ items, className = '' }) => {
  return (
    <ul className={`space-y-2 ${className}`}>
      {items.map((item, index) => (
        <motion.li 
          key={index}
          className="flex items-start gap-2"
          initial={{ opacity: 0, x: -10 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3, delay: index * 0.1 }}
          viewport={{ once: true }}
        >
          <span className="mt-1 text-gold">
            <Star size={14} fill="currentColor" stroke="none" />
          </span>
          <span>{item}</span>
        </motion.li>
      ))}
    </ul>
  );
};
