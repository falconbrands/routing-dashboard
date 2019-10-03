export interface Route {
  id: number
  actual_start_ms: number
  actual_end_ms: number
  group_id: number
  start_location_name: string
  name: string
  scheduled_start_ms: number
  scheduled_end_ms: number
  start_location_address: string
  start_location_lat: number
  start_location_lng: number
  dispatch_jobs: DispatchJob[]
  notes: string | null
}

export interface RouteConfig extends Pick<Route,
  'name' |
  'scheduled_start_ms' |
  'scheduled_end_ms' |
  'start_location_name' |
  'start_location_address' |
  'start_location_lat' |
  'start_location_lng' 
> {
  dispatch_jobs: DispatchJobConfig[]
}

export interface DispatchJob {
  id: number
  destination_address: string
  destination_lat: number
  destination_lng: number
  group_id: number
  dispatch_route_id: number
  destination_name: string
  job_state: string
  en_route_at_ms: number
  completed_at_ms: number
  skipped_at_ms: number
  arrived_at_ms: number
  fleet_viewer_url: string
  scheduled_arrival_time_ms: number
  scheduled_departure_time_ms: number
  notes: string
}

export type DispatchJobConfig = Pick<DispatchJob,
  'destination_name' |
  'destination_address' |
  'destination_lat' |
  'destination_lng' |
  'scheduled_arrival_time_ms' |
  'scheduled_departure_time_ms' |
  'notes' 
>
