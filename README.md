### [프로젝트 버전]
- react@19.0.0-rc-66855b96-20241106
- next@15.0.3
- typescript@5.7.2
- tailwindcss@3.4.16

### [프로젝트 설명]
RGT Bookstore는 Next.js와 Tailwind CSS를 기반으로 한 간단한 온라인 서점 프로젝트입니다. <br/>
사용자는 책을 검색하거나 필터링할 수 있으며, 관리 페이지를 통해 책 데이터를 추가, 수정, 삭제할 수 있습니다. <br/>
또한, RESTful API 설계를 기반으로 서버와의 데이터 통신도 고려하였습니다. <br/>

### [기술 스택]
프론트엔드: Next.js, React, Tailwind CSS
상태 관리: useState, 로컬 스토리지 (서버 없는 상태에서 데이터 관리)
API 통신: RESTful API 설계 (현재는 목업 데이터 기반)

### [주요 기능]
1. 사용자 페이지
- 검색 및 필터링
    - 책 제목 및 저자를 기준으로 검색.
    - 검색 결과는 페이지네이션을 통해 10개씩 표시.
- 페이지네이션
    - 페이지 번호 버튼을 클릭해 책 데이터 탐색.
- 책 상세 정보
    - 책을 클릭하면 상세 페이지로 이동하여 추가 정보를 확인 가능.
2. 관리 페이지
- 책 추가
    - 새로운 책 데이터를 추가할 수 있습니다.
- 책 수정
    - 책의 재고 및 기타 정보를 수정할 수 있습니다.
- 책 삭제
    - 선택한 책 데이터를 삭제할 수 있습니다.

### [프로젝트 구조]
```
project-root/
├── app/
│   ├── page.tsx                 # 루트 페이지, list_page.tsx로 리디렉션
│   ├── list_page/
│   │   ├── list_page.tsx        # 책 목록 및 검색 페이지
│   │   ├── book_list.tsx        # 책 목록 컴포넌트
│   │   ├── book_item.tsx        # 개별 책 컴포넌트
│   ├── manage_page/
│   │   ├── page.tsx             # 관리 페이지
│   └── [id]/
│       ├── page.tsx             # 책 상세 정보 페이지
├── utils/
│   ├── api.ts                   # API 호출 관련 유틸리티
│   ├── storage.ts               # 로컬 스토리지 관련 유틸리티
├── mock_data/
│   ├── books.ts                 # 목업 데이터
└── README.md                    # 프로젝트 설명 파일
```
