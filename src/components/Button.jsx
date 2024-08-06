// src/components/Buttons.js

export function RegionBtn({ name, onClick, active }) {
  const commonStyle = {
    width: '100px',
    height: '40px',
    borderRadius: '15px',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
  };

  // 상태에 따른 스타일
  const style = active
    ? {
        background: '#2F3267',
        color: 'white',
        border: 'none',
        fontWeight: 700,
      }
    : {
        background: '#E0E0E0',
        color: '#BCBCBC',
        border: 'none',
        fontWeight: 400,
      };

  // Object.assign()을 사용하여 스타일 객체 병합
  return (
    <button style={{ ...commonStyle, ...style }} onClick={onClick}>
      {name}
    </button>
  );
}

export function SubmitBtn({ onClick, active }) {
  const commonStyle = {
    width: '250px',
    height: '60px',
    borderRadius: '20px',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    fontSize: '18px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative', // Ensure spans are positioned correctly
    overflow: 'hidden',   // Clip overflow for animation
  };

  // Define styles based on the active state
  const activeStyle = {
    background: '#2F3267',
    color: 'white',
    border: 'none',
    fontWeight: 700,
  };

  const inactiveStyle = {
    background: '#E0E0E0',
    color: '#9E9E9E',
    border: 'none',
    fontWeight: 400,
    cursor: 'not-allowed',
  };

  // Merge styles
  const style = active ? activeStyle : inactiveStyle;

  return (
    <button
      style={{ ...commonStyle, ...style }}
      onClick={onClick}
      disabled={!active}
    >
      <span className="span-mother">
        <span>캠</span>
        <span>핑</span>
        <span>장</span>
        <span> </span>
        <span>보</span>
        <span>러</span>
        <span>가</span>
        <span>기</span>
      </span>
      <span className="span-mother2">
        <span>캠</span>
        <span>핑</span>
        <span>장</span>
        <span> </span>
        <span>보</span>
        <span>러</span>
        <span>가</span>
        <span>기</span>
      </span>
    </button>
  );
}
