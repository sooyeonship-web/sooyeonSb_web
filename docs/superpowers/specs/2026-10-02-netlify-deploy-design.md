# Netlify 배포 (A안) 설계

## 목표
GitHub Pages(정적) → Netlify(Next.js 서버 지원)로 배포 이전. 예약·관리자 기능은 이번 범위에서 제외.

## 배경
- 예약 API는 `USE_LOCAL = true`로 저장 없이 성공만 반환 → 공개 시 문의 유실
- 관리자 페이지/API에 인증 없음, 파일시스템 쓰기 → 서버리스에서 동작 불가

## 변경
1. 상세 페이지에서 `BookingButton` 제거, 기존 전화 문의 버튼을 primary로 (파일은 유지)
2. `middleware.ts` → production에서 `/admin`, `/api/admin`, `/booking`, `/api/bookings` 404 (코드는 유지)
3. `netlify.toml` (Node 22, `@netlify/plugin-nextjs`)
4. `next.config.ts` `outputFileTracingIncludes`로 `data/vessels.json` 번들 포함 (data/ 아래 원본 자료가 수백MB라 전체 포함 금지) (홈·선박목록 force-dynamic에서 런타임 readFileSync)

## 검증
`netlify build` 후 로컬 서빙: 홈/목록/상세 200, 차단 경로 404

## 범위 외
GitHub Pages 워크플로 유지, 예약 저장(B안), 관리자 인증(C안)
