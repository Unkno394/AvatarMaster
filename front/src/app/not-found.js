import Link from 'next/link';
import SadCat from '@/entities/avatar/ui/sad-cat';
import Logo from "@/shared/ui/icons/logo";

export default function NotFound() {
  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-[#B0C8F9] via-[#9494FE] to-[#6363C8] p-4 overflow-hidden">
      
      {/* Анимированный фон */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-1/4 left-1/4 w-32 h-32 rounded-full bg-white/10 animate-pulse"></div>
        <div className="absolute bottom-1/3 right-1/3 w-40 h-40 rounded-full bg-white/10 animate-pulse delay-300"></div>
      </div>

      {/* Контент */}
      <div className="relative z-10 text-center max-w-2xl">
        {/* Логотип и заголовок */}
        <div className="flex items-center justify-center gap-4 mb-8">
  <Logo className="w-16 h-16 sm:w-20 sm:h-20" size={64} />
  <h1 className="text-[40px] sm:text-[50px] md:text-[70px] font-['Jersey_15'] text-white leading-tight">
    AvatarMaster
  </h1>
</div>

        {/* Сообщение */}
        <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-8 sm:p-10 border border-white/20">
          <h2 className="text-4xl sm:text-5xl font-['Russo_One'] text-white mb-6 tracking-wide">
            404
          </h2>
          <p className="text-xl sm:text-2xl font-['Russo_One'] text-white mb-8 leading-relaxed">
            Ой! Пушистый котик не нашёл эту страницу
          </p>

          {/* Кот вынесен в компонент */}
          <div className="flex justify-center mb-[50px]">
            <SadCat />
          </div>

          <Link
            href="/"
            className="inline-block px-8 py-3 bg-white text-[#6363C8] rounded-full font-['Russo_One'] text-lg hover:bg-gray-100 transition-all transform hover:scale-105 shadow-lg"
          >
            Вернуться к чату
          </Link>
        </div>
      </div>

      {/* Футер */}
      <div className="mt-16 text-center">
        <p className="font-['Russo_One'] text-white/80 text-sm">
          © {new Date().getFullYear()} AvatarMaster
        </p>
      </div>
    </div>
  );
}
