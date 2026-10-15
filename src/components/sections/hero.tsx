import { Container } from '@/components/layout/container'
import { Badge } from '@/components/ui/badge'

export function HeroSection() {
  return (
    <section className="relative py-20 md:py-32">
      <Container>
        <div className="mx-auto max-w-4xl text-center">
          <Badge variant="secondary" className="mb-6">
            ✨ Next.js 16 기반 정적 UI 스타터
          </Badge>

          <h1 className="text-4xl font-bold tracking-tight sm:text-6xl">
            모던 웹 개발을 위한
            <span className="text-primary mt-2 block"> 완벽한 스타터킷</span>
          </h1>

          <p className="text-muted-foreground mx-auto mt-6 max-w-2xl text-lg">
            Next.js 16, TypeScript, TailwindCSS, shadcn/ui로 구성한 웹 UI
            시작점입니다. 기존 섹션과 재사용 컴포넌트를 바탕으로 프로젝트를
            확장하세요.
          </p>

          <div className="mt-12 grid grid-cols-2 gap-4 text-center md:grid-cols-4">
            <div>
              <div className="text-2xl font-bold">Next.js 16</div>
              <div className="text-muted-foreground text-sm">App Router</div>
            </div>
            <div>
              <div className="text-2xl font-bold">TypeScript</div>
              <div className="text-muted-foreground text-sm">타입 안정성</div>
            </div>
            <div>
              <div className="text-2xl font-bold">TailwindCSS</div>
              <div className="text-muted-foreground text-sm">유틸리티 CSS</div>
            </div>
            <div>
              <div className="text-2xl font-bold">ShadcnUI</div>
              <div className="text-muted-foreground text-sm">
                컴포넌트 라이브러리
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  )
}
