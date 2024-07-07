import Image from 'next/image'
export default function AuthLayout({ children }) {
    return (
      <main>
        <header className="w-full sticky top-0 h-16 shadow z-40 bg-white">
          <div className="container mx-auto flex justify-center items-center h-full">
             <Image 
               src={'/logo.png'}
               width={150}
               height={70}
               alt='logo'
             />
          </div>
        </header>
        { children}
      </main>
    );
  }
  