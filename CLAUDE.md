# 🤖 Claude Code 개발 지침

**nextjs-starter-kit**는 Next.js 16 + React 19 기반의 정적 UI 스타터 템플릿입니다. 로그인·회원가입 폼은 예시이며 인증 또는 계정 생성 서비스는 포함하지 않습니다.

## 🛠️ 핵심 기술 스택

- **Framework**: Next.js 16 (App Router + 기본 Turbopack)
- **Runtime**: React 19 + TypeScript 5
- **Styling**: TailwindCSS v4 + shadcn/ui (new-york style)
- **Forms**: React Hook Form + Zod dependencies; current forms are client-side UI examples
- **UI Components**: Radix UI + Lucide Icons
- **Development**: ESLint + Prettier + Husky + lint-staged

## 📚 개발 가이드

- **📁 프로젝트 구조**: `@/docs/guides/project-structure.md`
- **🎨 스타일링 가이드**: `@/docs/guides/styling-guide.md`
- **🧩 컴포넌트 패턴**: `@/docs/guides/component-patterns.md`
- **⚡ Next.js 16 가이드**: `@/docs/guides/nextjs-16.md`
- **📝 폼 처리 완전 가이드**: `@/docs/guides/forms-react-hook-form.md`

## ⚡ 자주 사용하는 명령어

```bash
# 개발
npm run dev         # 개발 서버 실행 (Turbopack)
npm run check-all   # 타입, 린트, 포맷, 폼 테스트 실행
npm run build       # 프로덕션 빌드

# UI 컴포넌트
npx shadcn@latest add button    # 새 컴포넌트 추가
```

## ✅ 작업 완료 체크리스트

```bash
npm run check-all   # 모든 검사 통과 확인
npm run build       # 빌드 성공 확인
```

💡 **상세 규칙은 위 개발 가이드 문서들을 참조하세요**
