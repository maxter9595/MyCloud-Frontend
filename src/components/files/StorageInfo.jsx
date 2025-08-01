import { useEffect } from 'react';
import { useSelector, useDispatch  } from 'react-redux';

import { fetchCurrentUser } from '../../store/slices/authSlice';


/**
 * Component that displays the 
 * user's storage usage with a 
 * progress bar. It fetches the 
 * current user's data every 3 
 * seconds and displays the used 
 * and total storage in GB. If 
 * the usage is higher than 90%,
 * it displays a warning message.
 *
 * @returns {ReactElement} The 
 * StorageInfo component
 * @example
 * <StorageInfo />
 */
const StorageInfo = () => {
  const dispatch = useDispatch();
  const { user } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    if (user) {
      const interval = setInterval(() => {
        dispatch(fetchCurrentUser());
      }, 3000);

      return () => clearInterval(interval);
    }
  }, [
    dispatch, 
    user
  ]);

  if (!user) return null;

  const usage = user.storage_usage || 0;
  const maxStorage = user.max_storage || 1;

  const percent = Math.min(
    100, (usage / maxStorage) * 100
  );
  
  const usedGB = (
    usage / (1024 * 1024 * 1024)
  ).toFixed(2);

  const maxGB = (
    maxStorage / (1024 * 1024 * 1024)
  ).toFixed(2);

  return (
    <div className="storage-info">
      <h3>Использование хранилища</h3>

      <div className="storage-bar">
        <div
          className="storage-progress"
          style={{
            width: `${percent}%`,
            backgroundColor: percent > 90 ? '#ff4d4f' : '#52c41a',
            height: '20px',
            transition: 'width 0.3s ease'
          }}
        />
      </div>
      
      <div className="storage-text">
        {usedGB} GB из {maxGB} GB ({percent.toFixed(1)}%)
      </div>
      
      {percent >= 90 && (
        <div className="storage-warning">
          Ваше хранилище почти заполнено! Обратитесь к 
          администратору для увеличения квоты. Электронная 
          почта администратора: admin@mail.ru.
        </div>
      )}
    </div>
  );
};

export default StorageInfo;
