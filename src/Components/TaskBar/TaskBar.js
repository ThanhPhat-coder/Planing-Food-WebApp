/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useEffect, useRef } from 'react';
import './TaskBar.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCog, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import chillMusic from '../Assets/Music/rick.MP3'; // Đường dẫn tới file nhạc chill

const TaskBar = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(new Audio(chillMusic)); // Tạo đối tượng audio với nhạc chill
  const [currentTime, setCurrentTime] = useState(0); // Lưu trữ thời gian hiện tại của nhạc
  const dropdownRef = useRef(null); // Tạo ref cho dropdown

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const toggleMusic = () => {
    if (isPlaying) {
      audioRef.current.pause(); // Dừng âm thanh nếu đang phát
      setIsPlaying(false);
    } else {
      audioRef.current.currentTime = currentTime; // Đặt lại thời gian hiện tại khi phát lại
      audioRef.current.play(); // Phát âm thanh từ thời gian đã dừng
      setIsPlaying(true);
    }
  };

  useEffect(() => {
    const updateTime = () => {
      setCurrentTime(audioRef.current.currentTime); // Cập nhật thời gian hiện tại khi âm thanh phát
    };

    audioRef.current.addEventListener('timeupdate', updateTime); // Lắng nghe sự kiện timeupdate để cập nhật thời gian

    return () => {
      audioRef.current.removeEventListener('timeupdate', updateTime); // Xóa sự kiện khi component unmount
    };
  }, []);

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setDropdownOpen(false); // Đóng dropdown khi nhấp ra ngoài
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside); // Thêm sự kiện lắng nghe cho cú nhấp chuột
    return () => {
      document.removeEventListener('mousedown', handleClickOutside); // Xóa sự kiện khi component unmount
    };
  }, []);

  return (
    <div className='taskbar-container'>
      <div className='taskbar-left'>
        <div className='taskbar-icon'>
          <i className="fa fa-home"></i>
        </div>
        <div className='music-icon' onClick={toggleMusic}>
          <i className="fa fa-music"></i>
          <span className='music-text'>{isPlaying ? 'Dừng nhạc' : 'Phát nhạc'}</span>
        </div>
      </div>
      <div className='taskbar-right'>
        <div className='taskbar-item-container'>
          <div className='taskbar-item'>Chức năng 1</div>
          <div className='taskbar-item'>Chức năng 2</div>
          <div className='taskbar-item'>Chức năng 3</div>
          <div className='taskbar-item'>Chức năng 4</div>
        </div>
        <div className='user-profile' onClick={toggleDropdown} ref={dropdownRef}>
          <img src='path/to/avatar.jpg' alt='User Avatar' className='user-avatar' />
          <div className='dropdown-icon'>
            <i className="fa fa-caret-down"></i>
          </div>
          {dropdownOpen && (
            <div className='dropdown-menu'>
              <a href='#'>
                <FontAwesomeIcon icon={faCog} /> Cài đặt
              </a>
              <a href='#'>
                <FontAwesomeIcon icon={faSignOutAlt} /> Đăng xuất
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TaskBar;
