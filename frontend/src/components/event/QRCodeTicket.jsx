import React from 'react';
import QRCode from 'qrcode.react';

const QRCodeTicket = ({ ticketData, eventName, eventDate, venue }) => {
    const qrValue = JSON.stringify({
        ticketId: ticketData.id,
        eventId: ticketData.eventId,
        userId: ticketData.userId,
        timestamp: Date.now()
    });

    return (
        <div className="max-w-md mx-auto bg-white rounded-2xl shadow-2xl overflow-hidden transform hover:scale-105 transition-transform duration-300">
            {/* Gradient Header */}
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-6 text-white">
                <div className="flex items-center justify-between mb-2">
                    <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                        <span className="text-sm font-bold">🎫</span>
                    </div>
                    <div className="text-xs opacity-80">ADMIT ONE</div>
                </div>
                <h2 className="text-xl font-bold mb-1 leading-tight">{eventName}</h2>
                <p className="text-blue-100 text-sm mb-1">
                    📅 {new Date(eventDate).toLocaleDateString('en-US', { 
                        weekday: 'long', 
                        year: 'numeric', 
                        month: 'long', 
                        day: 'numeric' 
                    })}
                </p>
                <p className="text-blue-100 text-sm">📍 {venue}</p>
            </div>
            
            {/* QR Code Section */}
            <div className="bg-gray-50 py-8 flex justify-center">
                <div className="bg-white p-4 rounded-xl shadow-lg">
                    <QRCode 
                        value={qrValue}
                        size={180}
                        level="M"
                        includeMargin={true}
                        fgColor="#1f2937"
                        bgColor="#ffffff"
                    />
                </div>
            </div>
            
            {/* Ticket Details */}
            <div className="p-6 space-y-4">
                <div className="grid grid-cols-2 gap-4">
                    <div className="bg-gray-50 p-3 rounded-lg">
                        <p className="text-xs text-gray-500 uppercase tracking-wide">Ticket ID</p>
                        <p className="font-mono text-sm font-semibold text-gray-800">
                            #{ticketData.id.toString().padStart(6, '0')}
                        </p>
                    </div>
                    <div className="bg-gray-50 p-3 rounded-lg">
                        <p className="text-xs text-gray-500 uppercase tracking-wide">Seat</p>
                        <p className="text-sm font-semibold text-gray-800">
                            {ticketData.seat || 'General Admission'}
                        </p>
                    </div>
                </div>
                
                <div className="bg-green-50 border border-green-200 p-3 rounded-lg">
                    <p className="text-xs text-green-600 uppercase tracking-wide">Price Paid</p>
                    <p className="text-lg font-bold text-green-700">${ticketData.price}</p>
                </div>
            </div>
            
            {/* Footer */}
            <div className="bg-gray-100 px-6 py-4 border-t border-gray-200">
                <div className="flex items-center justify-center space-x-2 text-gray-600">
                    <span className="text-lg">📱</span>
                    <p className="text-xs text-center">
                        Present this QR code at the venue for entry
                    </p>
                </div>
                <div className="mt-2 flex justify-center">
                    <div className="flex space-x-1">
                        {[1, 2, 3, 4, 5].map((dot) => (
                            <div key={dot} className="w-1 h-1 bg-gray-400 rounded-full"></div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default QRCodeTicket;