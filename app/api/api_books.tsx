import { NextApiRequest, NextApiResponse } from 'next';
import { books } from '@/app/mock_data/books'; 

const handler = (req: NextApiRequest, res: NextApiResponse) => {
    // GET 요청 처리
    if (req.method === 'GET') {
        // 모든 책 데이터를 반환
        res.status(200).json({
            books: books, // 모든 책 데이터 반환
            total: books.length, // 총 책 수
        });
    } else {
        res.setHeader('Allow', ['GET']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
};

export default handler;