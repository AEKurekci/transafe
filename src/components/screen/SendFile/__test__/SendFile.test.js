import {screen} from '@testing-library/react';
import customRender from "../../../../util/customRender";
import * as PageContext from "../../../../store/page-context";
import SendFile from "../SendFile";

let mockIsLoading = true;

jest.mock('../../../../hooks/use-http', () => {
    return () => ({
        isLoading: mockIsLoading,
        error: null,
        sendRequest: jest.fn()
    })
})

test('renders loading accounts', () => {
    const mockContext = {
        isLoggedIn: true,
        user: {
            name: 'Ali'
        }
    }
    jest.spyOn(PageContext, 'usePageContext').mockImplementation(() => mockContext)
    mockIsLoading = true

    customRender(<SendFile />, mockContext);
    const loading = screen.getByText(/Mevcut hesaplar yükleniyor/i);

    expect(loading).toBeInTheDocument();
});

test('renders send file inputs', () => {
    const mockContext = {
        isLoggedIn: true,
        user: {
            name: 'Ali'
        }
    }
    jest.spyOn(PageContext, 'usePageContext').mockImplementation(() => mockContext)
    mockIsLoading = false

    customRender(<SendFile />, mockContext);
    const loading = screen.getByLabelText(/Dosya Başlığı:/i);
    const receiver = screen.getByText(/Alıcı Firma:/i);
    const startDate = screen.getByLabelText(/Kullanılabilir Süre Başlangıç Tarihi:/i);
    const endDate = screen.getByLabelText(/Kullanılabilir Süre Bitiş Tarihi:/i);
    const file = screen.getByLabelText(/Dosya:/i);
    const sendButton = screen.getByRole('button', /Gönder/i)

    expect(loading).toBeInTheDocument();
    expect(receiver).toBeInTheDocument();
    expect(startDate).toBeInTheDocument();
    expect(endDate).toBeInTheDocument();
    expect(file).toBeInTheDocument();
    expect(sendButton).toBeInTheDocument();
});
