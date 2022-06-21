import customRender from "../../../../util/customRender";
import BlockItem from "../BlockItem";
import {render, screen} from "@testing-library/react";
import React from "react";

test('renders basic BlockItem', () => {
    let transferInfo = {
        startDate: '12:12 21/06/2022',
        endDate: '12:12 21/06/2022',
        senderAccount: 'ABC',
        receiverAccount: 'ABC',
        linearId: '123',
        isReceived: false,
        txhash: 'ABC'
    }
    render(<BlockItem id={transferInfo.txHash}
                      key={transferInfo.txHash}
                      senderAccount={transferInfo.senderAccount}
                      linearId={transferInfo.linearId}
                      receiverAccount={transferInfo.receiverAccount}
                      isReceived={transferInfo.isReceived}
                      txHash={transferInfo.txHash}
                      startDate={transferInfo.startDate}
                      endDate={transferInfo.endDate}/>)
    const dateTitle = screen.getByText('Dosya Kullanım Tarihi:')
    const mockDataContent = screen.getAllByText('ABC')
    const receiver = screen.getByText('Alıcı:')
    const transferIdTitle = screen.getByText('Transfer ID:')
    const transferId = screen.getByText('123')
    const sender = screen.getByText('Gönderen:')
    const sentText = screen.getByText('Gönderildi')

    expect(dateTitle).toBeTruthy()
    expect(mockDataContent).toBeTruthy()
    expect(receiver).toBeTruthy()
    expect(transferIdTitle).toBeTruthy()
    expect(transferId).toBeTruthy()
    expect(sender).toBeTruthy()
    expect(sentText).toBeTruthy()
})
test('renders Indirildi', () => {
    let transferInfo = {
        startDate: '12:12 21/06/2022',
        endDate: '12:12 21/06/2022',
        senderAccount: 'ABC',
        receiverAccount: 'ABC',
        linearId: '123',
        isReceived: true,
        txhash: 'ABC'
    }
    render(<BlockItem id={transferInfo.txHash}
                      key={transferInfo.txHash}
                      senderAccount={transferInfo.senderAccount}
                      linearId={transferInfo.linearId}
                      receiverAccount={transferInfo.receiverAccount}
                      isReceived={transferInfo.isReceived}
                      txHash={transferInfo.txHash}
                      startDate={transferInfo.startDate}
                      endDate={transferInfo.endDate}/>)
    const downloadText = screen.getByText('İndirildi')

    expect(downloadText).toBeTruthy()
})