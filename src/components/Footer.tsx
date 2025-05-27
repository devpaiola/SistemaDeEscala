import React from 'react';
import { MessageSquare } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-white border-t border-gray-200 py-4 sticky bottom-0 w-full">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          <p className="text-xs text-gray-500">
            &copy; {new Date().getFullYear()} Workmonitor. Tudo nosso reservado!.
          </p>
          
          <a
            href="https://example.com/chat"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center px-3 py-1.5 rounded-full text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 transition-colors shadow-sm"
          >
            <MessageSquare className="w-4 h-4 mr-1.5" />
            ChatIA
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;