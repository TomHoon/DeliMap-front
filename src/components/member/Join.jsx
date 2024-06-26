import '/src/styles/member/Join.css';
import {useNavigate} from "react-router-dom";
import {useState} from "react";
import axios from "axios";


const Join = () => {
    // 초기값 세팅
    const [member_id, setMember_id ] = useState('');
    const [member_pw, setMember_pw ] = useState('');
    const [member_name, setMember_name ] = useState('');
    const [member_nickname, setMember_nickname ] = useState('');
    const [member_phone, setMember_phone ] = useState('');
    const [member_email, setMember_email ] = useState('');
    const [join_email_cert, setJoin_email_cert ] = useState('');

    // 빈간 체크 메시지
    const [idMessage, setIdMessage ] = useState('');
    const [pwMessage, setPwMessage ] = useState('');
    const [nameMessage, setNameMessage ] = useState('');
    const [nicknameMessage, setNicknameMessage ] = useState('');
    const [phoneMessage, setPhoneMessage ] = useState('');
    const [emailMessage, setEmailMessage ] = useState('');
    const [emailCertMessage, setEmailCertMessage ] = useState('');

    // 유효성 메세지
    const [idRegMessage, setIdRegMessage ] = useState('');
    const [pwRegMessage, setPwRegMessage ] = useState('');


    // 아이디중복, 인증번호 버튼 여부
    const [isIdClicked, setIsIdClicked] = useState(false); //아이디 중복
    const [idEmailCert, setIdEmailCert ] = useState(false); //인증번호 전송
    const [idEmailConfm, setIdEmailConfm ] = useState(false);//인증번호 확인

    const [pwCke, setPwCke ] = useState('password');//인증번호 확인

    const navigate = useNavigate();

    const home = () => {
        navigate("/");
    }
    const join_regBtn = () => {
        const idRegExp  = /^(?=.*[a-z])(?=.*[0-9])[a-zA-Z0-9]{6,12}$/;
        if(member_id === '' || !member_id.trim()){
            setIdMessage('아이디를 입력해주세요.');
            setIdRegMessage(false);
        }else if(!idRegExp.test(member_id)){
            setIdRegMessage('아이디는 영문+숫자 포함 6~12자 이하');
            setIdMessage(false);
        }else {
            setIdMessage(false);
            setIdRegMessage(false);
        }
        const pwRegExp = /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[-_@.#$%^&*()!/]).{8,}$/;
        if(member_pw === '' || !member_pw.trim()){
            setPwMessage('비밀번호를 입력해주세요.');
            setPwRegMessage(false)
        }else if(!pwRegExp.test(member_pw)){
            setPwRegMessage('비밀번호는 영문+숫자+특수기호 포함 8자 이상');
            setPwMessage(false)
        }else{
            setPwMessage(false)
            setPwRegMessage(false)
        }
        if(member_name === '' || !member_name.trim()){
            setNameMessage('이름을 입력해주세요.');
        }else {
            setNameMessage(false);
        }
        if(member_nickname === '' || !member_nickname.trim()){
            setNicknameMessage('닉네임을 입력해주세요.');
        }else {
            setNicknameMessage(false);
        }
        if(member_phone === '' || !member_phone.trim()){
            setPhoneMessage('전화번호를 입력해주세요.');
        }else {
            setPhoneMessage(false);
        }
        if(member_email === '' || !member_email.trim()){
            setEmailMessage('이메일을 입력해주세요.');
        }else {
            setEmailMessage(false);
        }
        if(join_email_cert === '' || !join_email_cert.trim()){
            setEmailCertMessage('인증번호를 입력해주세요.');
        }else {
            setEmailCertMessage(false);
        }

        if(isIdClicked === false){
            setIdMessage('아이디 중복확인 해주세요');
            return false;
        }else if(idEmailCert === false) {
            setEmailMessage('이메일 인증확인 해주세요');
            return false;
        }else if(idEmailConfm === false) {
            setEmailCertMessage('인증번호 확인버튼을 눌러주세요.');
            return false;
        }else if(member_pw === '' || !member_pw.trim() || !pwRegExp.test(member_pw) || member_name === '' ||
            !member_name.trim() || member_nickname === '' || !member_nickname.trim() || member_phone === '' ||
            !member_phone.trim() || member_email === '' || !member_email.trim() || join_email_cert === '' ||
            !join_email_cert.trim() || isIdClicked === false || idEmailCert === false || idEmailConfm === false) {
            return false;
        }
        let param = {
            member_id : member_id,
            member_pw : member_pw,
            member_name : member_name,
            member_nickname : member_nickname,
            member_phone : member_phone,
            member_email : member_email,
        }
        axios.post('http://localhost:3300/member/joinMember', param).then(response => {
            alert("회원가입 되었습니다.");
            navigate("/Login");
        })
    }

    const join_id_btn = () => { // 아이디 중복 버튼
        const idRegExp  = /^(?=.*[a-z])(?=.*[0-9])[a-zA-Z0-9]{6,12}$/;
        if(member_id === '' || !member_id.trim()){
            setIdMessage('아이디를 입력해주세요.');
            setIdRegMessage(false);
        }else if(!idRegExp.test(member_id)) {
            setIdRegMessage('아이디는 영문+숫자 포함 6~12자 이하');
            setIdMessage(false);
        }else {
            alert('아이디 사용 가능');
            document.getElementById('join-id').readOnly=true;
            setIdRegMessage(false)
            setIdMessage(false)
            setIsIdClicked(true);
        }

    }
    const email_cert_btn = () => {  // 이메일 인증번호 전송
        if(member_email === '' || !member_email.trim()){
            setEmailMessage('이메일을 입력해주세요.');
            return false;
        }else {
            alert('인증번호가 전송되었습니다.')
            setEmailMessage(false);
            setIdEmailCert(true);
        }
    }
    const auth_area = () => { // 이메일 인증번호 확인
        if(join_email_cert === '' || !join_email_cert.trim()){
            setEmailCertMessage('인증번호를 입력해주세요.');
        }else if(idEmailCert === false){
            alert('이메일 인증확인 해주세요');
            return false;
        }else {
            alert('인증번호 확인');
            document.getElementById('join-email').readOnly=true;
            document.getElementById('join-email-cert').readOnly=true;
            setIdEmailCert(true);
            setIdEmailConfm(true);
            setEmailCertMessage(false);
        }
    }
    const join_cancelBtn = () => {
        if (confirm("회원가입을 취소하시겠습니까?")) {
            navigate('/Login');
        } else {
            return false;
        }
    }
    const pwEye = () => {
        setPwCke(!pwCke);
    }
    return (
        <>
            <div className="join_container">
                <div className="wrap-join">
                    <div className="join_wrapper">
                        <div className="join-top">
                            <span onClick={home} title={'홈'}>DeliMap</span>
                        </div>
                        <div className="join-Form">
                            <label htmlFor="join-id" className="join-label-text">아이디
                                <input type="text" id="join-id" className="join-id" placeholder="아이디를 입력해주세요" autoComplete="off" maxLength={12} value={member_id} onChange={(e) => setMember_id(e.target.value)}/>
                            </label>
                            <div className="id_check_memo">
                                <span>{idRegMessage}</span>
                                <span>{idMessage}</span>
                            </div>
                            <div className="join-id-btn" onClick={join_id_btn}>
                                <span>아이디 중복확인</span>
                            </div>
                        </div>
                        <div className="join-Form">
                            <label htmlFor="join-pw" className="join-label-text">비밀번호
                                <input type={pwCke ? "password" : 'text'} id="join-pw" className="join-pw" placeholder="비밀번호를 입력해주세요" autoComplete="off" value={member_pw} onChange={(e) => setMember_pw(e.target.value)}/>
                                <img src={'/src/assets/icons8-eye-48.png'} alt={'비밀번호보기'} id={'pwEye'} className={'pwEye'} onClick={pwEye} title={'비밀번호 보기'}/>
                            </label>
                            <div className="pw_check_memo">
                                <span>{pwRegMessage}</span>
                                <span>{pwMessage}</span>
                            </div>
                        </div>
                        <div className="join-Form">
                            <label htmlFor="join-name" className="join-label-text">이름
                                <input type="text" id="join-name" className="join-name" placeholder="이름을 입력해주세요"
                                       autoComplete="off" value={member_name}
                                       onChange={(e) => setMember_name(e.target.value)}/>
                            </label>
                            <div className="name_check_memo">
                                {nameMessage}
                            </div>
                        </div>
                        <div className="join-Form">
                            <label htmlFor="join-nickname" className="join-label-text">닉네임
                                <input type="text" id="join-nickname" className="join-nickname"
                                       placeholder="닉네임을 입력해주세요" autoComplete="off" value={member_nickname}
                                       onChange={(e) => setMember_nickname(e.target.value)}/>
                            </label>
                            <div className="nickname_check_memo">
                                {nicknameMessage}
                            </div>
                        </div>
                        <div className="join-Form">
                            <label htmlFor="join-phone" className="join-label-text">전화번호
                                <input type="text" id="join-phone" className="join-phone" placeholder="전화번호를 입력해주세요"
                                       autoComplete="off" maxLength={13} value={member_phone}
                                       onChange={(e) => setMember_phone(e.target.value)}/>
                            </label>
                            <div className="phone_check_memo">
                                {phoneMessage}
                            </div>
                        </div>
                        <div className="join-Form">
                            <label htmlFor="join-email" className="join-label-text">이메일
                                <input type="text" id="join-email" className="join-email" placeholder="이메일을 입력해주세요"
                                       autoComplete="off" value={member_email} onChange={(e) => setMember_email(e.target.value)}/>
                            </label>
                            <div className="email_check_memo">
                                <span>{emailMessage}</span>
                                <button className='email_cert_btn' onClick={email_cert_btn}>인증번호 전송</button>
                            </div>
                        </div>
                        <div className="join-Form">
                            <label htmlFor="join-email-cert" className="join-label-text">인증번호
                                <input type="text" id="join-email-cert" className="join-email-cert"
                                       placeholder="인증번호를 입력해주세요" autoComplete="off" value={join_email_cert}
                                       onChange={(e) => setJoin_email_cert(e.target.value)}/>
                            </label>
                            <div className="emailCert_check_memo">
                                <span>{emailCertMessage}</span>
                            </div>
                            <div className="auth-area" onClick={auth_area}>
                                <span>인증번호 확인</span>
                            </div>
                        </div>
                        <div className="join-btn">
                        <span className={'join_cancelBtn'} onClick={join_cancelBtn}>취소</span>
                            <span className={'join_regBtn'} onClick={join_regBtn}>회원가입</span>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Join