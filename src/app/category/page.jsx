export default function Category() {
    return(
        <>
        <div className="navwrap2">
                <h2>{`관리자님 환영합니다. ${adminId}`}</h2> 
                <Typography className="main1" onClick={handlereviewList}>면접 후기<br />게시판</Typography><br />
                <Typography className="main2" onClick={handleuserList}>유저 관리</Typography><br />
                <Typography className="main3" onClick={handleadminList}>관리자 생성</Typography><br />
                <Typography className="main4" onClick={handlequeryList}>1:1 문의</Typography><br />
            </div>
        </>
    )
}