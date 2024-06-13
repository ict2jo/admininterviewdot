import Link from "next/link";

export default function Nav() {
    return(
        <>
        <div className="navwrap">
        <Link href='/' className="nav">면접 후기 게시판</Link><br />
        <Link href='/' className="nav">유저 관리</Link><br />
        <Link href='/' className="nav">관리자 생성</Link><br />
        <Link href='/' className="nav">1:1문의</Link><br />
        </div>
        </>
    )
}