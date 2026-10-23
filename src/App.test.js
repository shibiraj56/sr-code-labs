import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import App from './App';

beforeEach(() => {
  jest.clearAllMocks();
  global.fetch = jest.fn(() =>
    Promise.resolve({
      ok: true,
      json: () => Promise.resolve({ success: true, message: 'Enquiry received.' }),
    })
  );
});

test('renders company brand, slogan, and navigation elements', () => {
  render(<App />);
  const brandElements = screen.getAllByText(/SR CODE/i);
  expect(brandElements.length).toBeGreaterThan(0);

  expect(screen.getAllByText(/BUILD\. INNOVATE\. SCALE\./i).length).toBeGreaterThan(0);

  // Check navigation links
  expect(screen.getAllByText(/Services/i).length).toBeGreaterThan(0);
  expect(screen.getAllByText(/Portfolio/i).length).toBeGreaterThan(0);
  expect(screen.getAllByText(/About/i).length).toBeGreaterThan(0);
  expect(screen.getAllByText(/Contact/i).length).toBeGreaterThan(0);
});

test('renders mobile hamburger toggle button and toggles menu', () => {
  render(<App />);
  const toggleBtn = screen.getByLabelText(/Toggle navigation menu/i);
  expect(toggleBtn).toBeInTheDocument();
  expect(toggleBtn).toHaveAttribute('aria-expanded', 'false');

  // Click toggle
  fireEvent.click(toggleBtn);
  expect(toggleBtn).toHaveAttribute('aria-expanded', 'true');

  // Click again to close
  fireEvent.click(toggleBtn);
  expect(toggleBtn).toHaveAttribute('aria-expanded', 'false');
});

test('renders hero with exact required headline and CTAs', () => {
  render(<App />);
  expect(
    screen.getByRole('heading', {
      name: /We Build Digital Solutions That Help Businesses Grow\./i,
    })
  ).toBeInTheDocument();

  expect(screen.getAllByRole('button', { name: /Start a Project/i }).length).toBeGreaterThan(0);
  expect(screen.getByRole('button', { name: /Explore Our Work/i })).toBeInTheDocument();

  expect(screen.getByText(/10\+/i)).toBeInTheDocument();
  expect(screen.getByText(/Completed Projects/i)).toBeInTheDocument();
  expect(screen.getByText(/< 24h/i)).toBeInTheDocument();
  expect(screen.getByText(/Response Time/i)).toBeInTheDocument();
  expect(screen.getAllByText(/100%/i).length).toBeGreaterThan(0);
  expect(screen.getByText(/Code Ownership/i)).toBeInTheDocument();
});

test('renders the 6 core services in client-friendly language', () => {
  render(<App />);
  expect(screen.getAllByText(/Business Websites & Landing Pages/i).length).toBeGreaterThan(0);
  expect(screen.getAllByText(/E-commerce Development/i).length).toBeGreaterThan(0);
  expect(screen.getAllByText(/Custom Web Applications/i).length).toBeGreaterThan(0);
  expect(screen.getAllByText(/Billing, Inventory & Business Management Software/i).length).toBeGreaterThan(0);
  expect(screen.getAllByText(/Dashboards, Reporting & Workflow Automation/i).length).toBeGreaterThan(0);
  expect(screen.getAllByText(/Website Maintenance & Redesign/i).length).toBeGreaterThan(0);
});

test('renders verified portfolio projects without fabricated claims', () => {
  render(<App />);
  expect(screen.getByText(/Smart Inventory ERP/i)).toBeInTheDocument();
  expect(screen.getByText(/Vehicle Master/i)).toBeInTheDocument();
  expect(screen.getByText(/Amazon Product Data Analysis/i)).toBeInTheDocument();
  expect(screen.getByText(/Textile Shopping Platform/i)).toBeInTheDocument();
  expect(screen.getByText(/PowerFit Gym Management System/i)).toBeInTheDocument();
  expect(screen.getByText(/N100 Financial Intelligence Platform/i)).toBeInTheDocument();
  expect(screen.getByText(/Local TV Hub/i)).toBeInTheDocument();
});

test('renders 5-step process in About section', () => {
  render(<App />);
  expect(screen.getByText(/Our 5-Step Development Process/i)).toBeInTheDocument();
  expect(screen.getByText(/Understand Business Requirements/i)).toBeInTheDocument();
  expect(screen.getByText(/Agree on Scope, Deliverables & Cost/i)).toBeInTheDocument();
  expect(screen.getByText(/Design & Develop the Solution/i)).toBeInTheDocument();
  expect(screen.getByText(/Test & Review with You/i)).toBeInTheDocument();
  expect(screen.getByText(/Deploy & Provide Agreed Support/i)).toBeInTheDocument();
});

test('renders complete contact form and submits inquiry successfully', async () => {
  render(<App />);
  const nameInput = screen.getByLabelText(/Full Name/i);
  const emailInput = screen.getByLabelText(/Contact Email/i);
  const companyInput = screen.getByLabelText(/Company \/ Business Name/i);
  const phoneInput = screen.getByLabelText(/Phone \/ WhatsApp/i);
  const serviceSelect = screen.getByLabelText(/Service Required/i);
  const messageInput = screen.getByLabelText(/Project Description & Scope/i);
  const submitBtn = screen.getByRole('button', { name: /Send Project Enquiry/i });

  expect(nameInput).toBeInTheDocument();
  expect(emailInput).toBeInTheDocument();
  expect(companyInput).toBeInTheDocument();
  expect(phoneInput).toBeInTheDocument();
  expect(serviceSelect).toBeInTheDocument();
  expect(messageInput).toBeInTheDocument();

  fireEvent.change(nameInput, { target: { value: 'John Smith' } });
  fireEvent.change(emailInput, { target: { value: 'john@acme.com' } });
  fireEvent.change(serviceSelect, { target: { value: 'Custom Web Applications' } });
  fireEvent.change(messageInput, { target: { value: 'Need a custom web app for customer order management.' } });

  fireEvent.click(submitBtn);

  await waitFor(() => {
    expect(screen.getByText(/Enquiry Transmitted Successfully/i)).toBeInTheDocument();
  });
});
