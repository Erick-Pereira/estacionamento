import Sidebar from '../component/Aside/index';
import React from "react";

export const metadata = {
  title: 'Estacionamento',
  description: 'Aplicação de estacionamento',
};

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="pt-BR">
      <body>
        <div className="flex">
          <Sidebar />
          <main>
            
          </main>
        </div>
      </body>
    </html>
  );
};

export default Layout;