import { render, screen, fireEvent } from '@testing-library/react';
import FileItem from './FileItem';

const mockFile = {
  id: 1,
  original_name: 'test.txt',
  size: 1024,
  comment: 'Test file',
  shared_link: 'abc123'
};

describe('FileItem', () => {
  it('renders file information correctly', () => {
    render(<FileItem file={mockFile} />);
    
    expect(screen.getByText('test.txt')).toBeInTheDocument();
    expect(screen.getByText('0.00 MB')).toBeInTheDocument();
    expect(screen.getByText('Test file')).toBeInTheDocument();
  });

  it('shows edit input when edit button clicked', () => {
    render(<FileItem file={mockFile} />);
    
    fireEvent.click(screen.getByTitle('Редактировать'));
    expect(screen.getByDisplayValue('Test file')).toBeInTheDocument();
  });

  it('calls download handler when download button clicked', () => {
    render(<FileItem file={mockFile} />);
    
    fireEvent.click(screen.getByTitle('Скачать'));
    // Здесь можно добавить проверку моков, если используется jest.mock для API
  });

  it('copies download link when link button clicked', () => {
    Object.assign(navigator, {
      clipboard: {
        writeText: jest.fn(),
      },
    });

    render(<FileItem file={mockFile} />);
    
    fireEvent.click(screen.getByTitle('Копировать ссылку'));
    expect(navigator.clipboard.writeText).toHaveBeenCalledWith(
      expect.stringContaining('/storage/shared/abc123/')
    );
  });

  it('shows delete confirmation when delete button clicked', () => {
    window.confirm = jest.fn(() => true);
    
    render(<FileItem file={mockFile} />);
    fireEvent.click(screen.getByTitle('Удалить'));
    
    expect(window.confirm).toHaveBeenCalledWith(
      'Вы уверены, что хотите удалить этот файл?'
    );
  });
});
