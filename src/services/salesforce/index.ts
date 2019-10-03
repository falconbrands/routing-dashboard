import { SalesforceService } from './SalesforceService'
import { SalesforceTestService } from './SalesforceTestService'

// export default new SalesforceService()

export default process.env.NODE_ENV === 'production' ? new SalesforceService() : new SalesforceTestService()

export * from './types'