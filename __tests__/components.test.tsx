import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { NavbarComponent } from '../components/navbarComponent';
import { HeroComponent } from '../components/hero';
import ListHospitals from '../components/listHospitals';
import AddItem from '../components/addItem';
import { AuthContextProvider } from '../context/AuthContext';
import { getHospitals, addHospital } from '../utils/service';

// Mock the next/navigation module
jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: jest.fn(),
  }),
}));

// Mock the Firebase auth context
jest.mock('../context/AuthContext', () => ({
  useAuthContext: () => ({
    user: null,
    logout: jest.fn(),
  }),
  AuthContextProvider: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
}));

// Mock the service functions
jest.mock('../utils/service', () => ({
  getHospitals: jest.fn(),
  addHospital: jest.fn(),
}));

// Mock ReactQuill
jest.mock('react-quill', () => ({
  __esModule: true,
  default: () => <div data-testid="mock-quill" />,
}));

describe('NavbarComponent', () => {
  it('renders correctly', () => {
    render(<NavbarComponent />);
    expect(screen.getByText('Care-Finder')).toBeInTheDocument();
    expect(screen.getByText('Sign in /Register')).toBeInTheDocument();
  });
});

describe('HeroComponent', () => {
  it('renders correctly', () => {
    render(<HeroComponent />);
    expect(screen.getByText('Care-Finder')).toBeInTheDocument();
    expect(screen.getByText(/A platform to help you find the right care provider for your loved ones/)).toBeInTheDocument();
  });
});

describe('ListHospitals', () => {
  beforeEach(() => {
    (getHospitals as jest.Mock).mockResolvedValue({
      hospitals: [
        { id: '1', name: 'Hospital A', state: 'State A' },
        { id: '2', name: 'Hospital B', state: 'State B' },
      ],
      nextPage: null,
    });
  });

  it('renders and fetches hospitals', async () => {
    render(<ListHospitals />);
    
    await waitFor(() => {
      expect(screen.getByText('Hospital A')).toBeInTheDocument();
      expect(screen.getByText('Hospital B')).toBeInTheDocument();
    });
  });

  it('allows searching for hospitals', async () => {
    render(<ListHospitals />);
    
    const searchInput = screen.getByPlaceholderText('Search Providers');
    fireEvent.change(searchInput, { target: { value: 'Hospital A' } });

    await waitFor(() => {
      expect(getHospitals).toHaveBeenCalledWith(expect.objectContaining({ searchTerm: 'Hospital A' }));
    });
  });
});

describe('AddItem', () => {
  it('renders the form correctly', () => {
    render(<AddItem />);
    expect(screen.getByLabelText('Hospital Name')).toBeInTheDocument();
    expect(screen.getByText('Description')).toBeInTheDocument();
    expect(screen.getByLabelText('State')).toBeInTheDocument();
    expect(screen.getByText('Add Item')).toBeInTheDocument();
  });

  it('submits the form with correct data', async () => {
    render(<AddItem />);
    
    fireEvent.change(screen.getByLabelText('Hospital Name'), { target: { value: 'New Hospital' } });
    fireEvent.change(screen.getByLabelText('State'), { target: { value: 'New State' } });
    
    fireEvent.click(screen.getByText('Add Item'));

    await waitFor(() => {
      expect(addHospital).toHaveBeenCalledWith('New Hospital', '', 'New State');
    });
  });
});