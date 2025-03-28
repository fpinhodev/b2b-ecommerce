import { beforeAll, describe, expect, test } from 'vitest'

const mockResponse1 = {
  id: 111,
  name: 'Produto PT',
  description: 'Descrição produto 1',
  price: 19,
  images: [
    {
      id: '6799030908d84699cc8389b1',
      imagesUpload: {
        id: 4,
        alt: 'Product 1',
        updatedAt: '2025-01-28T16:18:49.028Z',
        createdAt: '2025-01-28T16:18:49.028Z',
        url: 'http://localhost:3000/api/media/file/produto-1.jpg',
        thumbnailURL: 'http://localhost:3000/api/media/file/produto-1-300x199.jpg',
        filename: 'produto-1.jpg',
        mimeType: 'image/jpeg',
        filesize: 489465,
        width: 4314,
        height: 2857,
        focalX: 50,
        focalY: 50,
        sizes: {
          thumbnail: {
            url: 'http://localhost:3000/api/media/file/produto-1-300x199.jpg',
            width: 300,
            height: 199,
            mimeType: 'image/jpeg',
            filesize: 4866,
            filename: 'produto-1-300x199.jpg',
          },
          square: {
            url: 'http://localhost:3000/api/media/file/produto-1-500x500.jpg',
            width: 500,
            height: 500,
            mimeType: 'image/jpeg',
            filesize: 20945,
            filename: 'produto-1-500x500.jpg',
          },
          small: {
            url: 'http://localhost:3000/api/media/file/produto-1-600x397.jpg',
            width: 600,
            height: 397,
            mimeType: 'image/jpeg',
            filesize: 14941,
            filename: 'produto-1-600x397.jpg',
          },
          medium: {
            url: 'http://localhost:3000/api/media/file/produto-1-900x596.jpg',
            width: 900,
            height: 596,
            mimeType: 'image/jpeg',
            filesize: 31202,
            filename: 'produto-1-900x596.jpg',
          },
          large: {
            url: 'http://localhost:3000/api/media/file/produto-1-1400x927.jpg',
            width: 1400,
            height: 927,
            mimeType: 'image/jpeg',
            filesize: 70119,
            filename: 'produto-1-1400x927.jpg',
          },
          xlarge: {
            url: 'http://localhost:3000/api/media/file/produto-1-1920x1272.jpg',
            width: 1920,
            height: 1272,
            mimeType: 'image/jpeg',
            filesize: 129157,
            filename: 'produto-1-1920x1272.jpg',
          },
          og: {
            url: 'http://localhost:3000/api/media/file/produto-1-1200x630.jpg',
            width: 1200,
            height: 630,
            mimeType: 'image/jpeg',
            filesize: 50876,
            filename: 'produto-1-1200x630.jpg',
          },
        },
      },
    },
  ],
  updatedAt: '2025-02-21T17:02:11.329Z',
  createdAt: '2024-12-19T15:54:33.216Z',
}
const mockResponse2 = {
  id: 13,
  firstName: 'Filipe123',
  lastName: 'Pinho1',
  phone: '1919999999',
  roles: ['admin'],
  blockedAccount: false,
  customerDiscount: 0,
  erpId: 0,
  sellerId: 0,
  priceListId: '0',
  status: 'active',
  addresses: [
    {
      id: '67e1a3be7d50c55508674360',
      addressLine1: 'Street 11',
      addressLine2: '',
      city: 'OAZ',
      state: 'State',
      zipCode: '3700-000',
      country: 'Portugal',
      isDefault: true,
    },
    {
      id: '67e53eadde175f25e063a083',
      addressLine1: 'Street',
      addressLine2: '',
      city: 'OAZ',
      state: 'State',
      zipCode: '3700-000',
      country: 'Portugal',
      isDefault: false,
    },
  ],
  updatedAt: '2025-03-27T16:24:07.422Z',
  createdAt: '2025-03-11T14:37:18.577Z',
  email: 'fpinhodev@gmail.com',
  loginAttempts: 0,
}
const token =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTMsImNvbGxlY3Rpb24iOiJ1c2VycyIsImVtYWlsIjoiZnBpbmhvZGV2QGdtYWlsLmNvbSIsInJvbGVzIjpbImFkbWluIl0sImlhdCI6MTc0MzEwNTA5MCwiZXhwIjoxNzQzMTA4NjkwfQ.Op1wnyMADUFDndvenbKioRE4YmvvaDyhOHe42F9flek'

describe('Todo Service', () => {
  let response: Response
  let body: Record<string, any>

  beforeAll(async () => {
    response = await fetch('http://localhost:3000/api/users/13', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    body = await response.json()
  }, 30000)

  test('Should have response status 200', () => {
    expect(response.status).toBe(200)
  })

  test('Should have content-type', () => {
    expect(response.headers.get('Content-Type')).toBe('application/json')
  })

  test('Should match the response body with the mock user data', () => {
    expect(body).toStrictEqual(mockResponse2)
  })
})
