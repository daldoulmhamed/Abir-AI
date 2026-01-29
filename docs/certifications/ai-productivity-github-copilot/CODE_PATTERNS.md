# GitHub Copilot Code Patterns Reference

Quick reference guide for effective GitHub Copilot prompts and patterns across different programming tasks.

---

## Table of Contents

1. [Web API Development](#web-api-development)
2. [Data Processing](#data-processing)
3. [Testing Patterns](#testing-patterns)
4. [Database Operations](#database-operations)
5. [Error Handling](#error-handling)
6. [Async Patterns](#async-patterns)
7. [Authentication & Security](#authentication--security)
8. [File Operations](#file-operations)

---

## Web API Development

### REST API Endpoint with Full Validation

```typescript
// Create a POST endpoint for creating a new product
// Requirements:
// - Validate all required fields (name, price, category, stock)
// - Price must be positive number
// - Stock must be non-negative integer
// - Category must be one of: electronics, clothing, food, books
// - Name must be 3-100 characters
// - Return 400 for validation errors with specific messages
// - Return 201 with created product on success
// - Handle database errors gracefully
//
// Request body example:
// {
//   "name": "Laptop Pro",
//   "price": 999.99,
//   "category": "electronics",
//   "stock": 50
// }
//
// Response example:
// {
//   "success": true,
//   "product": { "id": "prod_123", "name": "Laptop Pro", ... },
//   "message": "Product created successfully"
// }

import { Request, Response } from 'express';
import { z } from 'zod';

// Define validation schema
const ProductSchema = z.object({
  name: z.string().min(3).max(100),
  price: z.number().positive(),
  category: z.enum(['electronics', 'clothing', 'food', 'books']),
  stock: z.number().int().nonnegative(),
});

type ProductInput = z.infer<typeof ProductSchema>;

app.post('/api/products', async (req: Request, res: Response) => {
  try {
    // Validate request body
    const validatedData: ProductInput = ProductSchema.parse(req.body);
    
    // Create product in database
    const product = await db.products.create({
      data: {
        ...validatedData,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    });
    
    // Return success response
    res.status(201).json({
      success: true,
      product,
      message: 'Product created successfully',
    });
    
  } catch (error) {
    // Handle validation errors
    if (error instanceof z.ZodError) {
      return res.status(400).json({
        success: false,
        errors: error.errors.map(err => ({
          field: err.path.join('.'),
          message: err.message,
        })),
      });
    }
    
    // Handle database errors
    console.error('Database error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to create product',
    });
  }
});
```

---

## Data Processing

### Data Transformation Pipeline

```python
from typing import List, Dict, Optional
from datetime import datetime
import pandas as pd

# Create a data processing pipeline for sales data
# Steps:
# 1. Load CSV data with columns: date, product, quantity, price, region
# 2. Convert date strings to datetime objects
# 3. Calculate total_amount = quantity * price
# 4. Filter out invalid entries (negative quantities or prices)
# 5. Group by region and calculate:
#    - Total sales amount
#    - Average order value
#    - Number of transactions
#    - Best-selling product
# 6. Sort regions by total sales (descending)
# 7. Export results to JSON with formatted numbers
#
# Input CSV format:
# date,product,quantity,price,region
# 2024-01-15,Laptop,2,999.99,North
# 2024-01-16,Mouse,5,29.99,South
#
# Output JSON format:
# {
#   "regions": [
#     {
#       "region": "North",
#       "total_sales": 15234.50,
#       "avg_order_value": 234.56,
#       "transactions": 65,
#       "top_product": "Laptop"
#     }
#   ],
#   "generated_at": "2024-01-28T10:30:00Z"
# }

def process_sales_data(csv_path: str, output_path: str) -> Dict:
    """
    Process sales data and generate regional statistics.
    
    Args:
        csv_path: Path to input CSV file
        output_path: Path for output JSON file
        
    Returns:
        Dictionary with processed statistics
        
    Raises:
        FileNotFoundError: If CSV file doesn't exist
        ValueError: If data contains invalid entries
    """
    # Step 1: Load CSV data
    df = pd.read_csv(csv_path)
    
    # Step 2: Convert dates
    df['date'] = pd.to_datetime(df['date'])
    
    # Step 3: Calculate total amount
    df['total_amount'] = df['quantity'] * df['price']
    
    # Step 4: Filter invalid entries
    df_valid = df[
        (df['quantity'] > 0) & 
        (df['price'] > 0)
    ].copy()
    
    if len(df_valid) == 0:
        raise ValueError("No valid entries found in data")
    
    # Step 5: Group by region and aggregate
    regional_stats = []
    
    for region in df_valid['region'].unique():
        region_data = df_valid[df_valid['region'] == region]
        
        # Calculate statistics
        total_sales = region_data['total_amount'].sum()
        avg_order = region_data['total_amount'].mean()
        num_transactions = len(region_data)
        
        # Find best-selling product (by quantity)
        top_product = (
            region_data.groupby('product')['quantity']
            .sum()
            .idxmax()
        )
        
        regional_stats.append({
            'region': region,
            'total_sales': round(total_sales, 2),
            'avg_order_value': round(avg_order, 2),
            'transactions': int(num_transactions),
            'top_product': top_product
        })
    
    # Step 6: Sort by total sales
    regional_stats.sort(
        key=lambda x: x['total_sales'],
        reverse=True
    )
    
    # Step 7: Prepare output
    result = {
        'regions': regional_stats,
        'generated_at': datetime.utcnow().isoformat() + 'Z',
        'total_records_processed': len(df_valid)
    }
    
    # Export to JSON
    import json
    with open(output_path, 'w') as f:
        json.dump(result, f, indent=2)
    
    return result


# Usage example
if __name__ == '__main__':
    result = process_sales_data(
        csv_path='sales_data.csv',
        output_path='regional_stats.json'
    )
    print(f"Processed {len(result['regions'])} regions")
```

---

## Testing Patterns

### Comprehensive Unit Tests with Edge Cases

```python
import pytest
from decimal import Decimal
from unittest.mock import Mock, patch

# Test suite for shopping cart functionality
# Requirements to test:
# - Adding items with valid quantities
# - Removing items
# - Calculating totals with/without discounts
# - Edge cases: empty cart, negative quantities, invalid discounts
# - Tax calculations
# - Stock availability checks

class TestShoppingCart:
    """Comprehensive test suite for ShoppingCart class."""
    
    @pytest.fixture
    def empty_cart(self):
        """Fixture providing a fresh empty cart for each test."""
        return ShoppingCart()
    
    @pytest.fixture
    def cart_with_items(self):
        """Fixture providing a cart with sample items."""
        cart = ShoppingCart()
        cart.add_item(Product("Apple", Decimal("1.50")), quantity=5)
        cart.add_item(Product("Banana", Decimal("0.75")), quantity=3)
        return cart
    
    # === Basic Operations Tests ===
    
    def test_empty_cart_has_zero_total(self, empty_cart):
        """Empty cart should have a total of 0."""
        assert empty_cart.get_total() == Decimal("0")
        assert empty_cart.item_count() == 0
    
    def test_add_single_item(self, empty_cart):
        """Adding a single item should update cart correctly."""
        product = Product("Apple", Decimal("1.50"))
        empty_cart.add_item(product, quantity=1)
        
        assert empty_cart.item_count() == 1
        assert empty_cart.get_total() == Decimal("1.50")
    
    def test_add_multiple_quantities(self, empty_cart):
        """Adding multiple quantities should multiply price."""
        product = Product("Apple", Decimal("1.50"))
        empty_cart.add_item(product, quantity=3)
        
        assert empty_cart.get_total() == Decimal("4.50")
    
    def test_add_multiple_different_items(self, empty_cart):
        """Cart should handle multiple different products."""
        empty_cart.add_item(Product("Apple", Decimal("1.50")), 2)
        empty_cart.add_item(Product("Banana", Decimal("0.75")), 3)
        empty_cart.add_item(Product("Orange", Decimal("2.00")), 1)
        
        expected_total = Decimal("1.50") * 2 + Decimal("0.75") * 3 + Decimal("2.00")
        assert empty_cart.get_total() == expected_total
        assert empty_cart.item_count() == 6  # Total items
    
    # === Edge Cases Tests ===
    
    def test_add_item_with_zero_quantity_raises_error(self, empty_cart):
        """Adding item with quantity 0 should raise ValueError."""
        product = Product("Apple", Decimal("1.50"))
        with pytest.raises(ValueError, match="Quantity must be positive"):
            empty_cart.add_item(product, quantity=0)
    
    def test_add_item_with_negative_quantity_raises_error(self, empty_cart):
        """Adding item with negative quantity should raise ValueError."""
        product = Product("Apple", Decimal("1.50"))
        with pytest.raises(ValueError, match="Quantity must be positive"):
            empty_cart.add_item(product, quantity=-5)
    
    def test_remove_item_not_in_cart_raises_error(self, empty_cart):
        """Removing non-existent item should raise KeyError."""
        with pytest.raises(KeyError, match="Item not found in cart"):
            empty_cart.remove_item("NonExistent")
    
    # === Discount Tests ===
    
    def test_apply_valid_percentage_discount(self, cart_with_items):
        """Valid discount percentage should reduce total."""
        original_total = cart_with_items.get_total()
        discounted_total = cart_with_items.apply_discount(20)  # 20% off
        
        expected = original_total * Decimal("0.80")
        assert discounted_total == expected
    
    def test_apply_discount_over_100_raises_error(self, cart_with_items):
        """Discount over 100% should raise ValueError."""
        with pytest.raises(ValueError, match="Discount must be between 0 and 100"):
            cart_with_items.apply_discount(150)
    
    def test_apply_negative_discount_raises_error(self, cart_with_items):
        """Negative discount should raise ValueError."""
        with pytest.raises(ValueError, match="Discount must be between 0 and 100"):
            cart_with_items.apply_discount(-10)
    
    # === Tax Calculation Tests ===
    
    def test_calculate_tax_with_default_rate(self, cart_with_items):
        """Default tax rate should be applied correctly."""
        subtotal = cart_with_items.get_total()
        tax = cart_with_items.calculate_tax()  # Default 8.5%
        
        expected_tax = subtotal * Decimal("0.085")
        assert tax == expected_tax.quantize(Decimal("0.01"))
    
    def test_calculate_tax_with_custom_rate(self, cart_with_items):
        """Custom tax rate should override default."""
        subtotal = cart_with_items.get_total()
        tax = cart_with_items.calculate_tax(rate=Decimal("0.10"))  # 10%
        
        expected_tax = subtotal * Decimal("0.10")
        assert tax == expected_tax.quantize(Decimal("0.01"))
    
    # === Stock Availability Tests (with mocking) ===
    
    @patch('inventory.check_stock')
    def test_add_item_checks_stock_availability(self, mock_check_stock, empty_cart):
        """Adding item should verify stock availability."""
        mock_check_stock.return_value = True
        product = Product("Apple", Decimal("1.50"))
        
        empty_cart.add_item(product, quantity=5)
        
        mock_check_stock.assert_called_once_with(product.id, 5)
    
    @patch('inventory.check_stock')
    def test_add_item_raises_error_when_insufficient_stock(
        self, mock_check_stock, empty_cart
    ):
        """Adding item should fail when stock insufficient."""
        mock_check_stock.return_value = False
        product = Product("Apple", Decimal("1.50"))
        
        with pytest.raises(StockError, match="Insufficient stock"):
            empty_cart.add_item(product, quantity=1000)
    
    # === Integration Tests ===
    
    def test_complete_checkout_flow(self, empty_cart):
        """Test complete checkout workflow."""
        # Add items
        empty_cart.add_item(Product("Laptop", Decimal("999.99")), 1)
        empty_cart.add_item(Product("Mouse", Decimal("29.99")), 2)
        
        # Apply discount
        subtotal = empty_cart.get_total()
        discounted = empty_cart.apply_discount(10)  # 10% off
        
        # Calculate tax
        tax = empty_cart.calculate_tax(rate=Decimal("0.08"))
        
        # Calculate final total
        final_total = discounted + tax
        
        # Verify calculations
        expected_subtotal = Decimal("999.99") + (Decimal("29.99") * 2)
        expected_discounted = expected_subtotal * Decimal("0.90")
        expected_tax = expected_discounted * Decimal("0.08")
        expected_final = expected_discounted + expected_tax
        
        assert subtotal == expected_subtotal
        assert discounted == expected_discounted
        assert final_total == expected_final


# === Parametrized Tests ===

@pytest.mark.parametrize("discount,expected_multiplier", [
    (0, Decimal("1.00")),      # No discount
    (10, Decimal("0.90")),     # 10% off
    (25, Decimal("0.75")),     # 25% off
    (50, Decimal("0.50")),     # 50% off
    (100, Decimal("0.00")),    # 100% off (free)
])
def test_various_discount_percentages(discount, expected_multiplier):
    """Test different discount percentages."""
    cart = ShoppingCart()
    cart.add_item(Product("Test", Decimal("100.00")), 1)
    
    discounted = cart.apply_discount(discount)
    expected = Decimal("100.00") * expected_multiplier
    
    assert discounted == expected
```

---

## Database Operations

### Database CRUD with Transaction Support

```typescript
// Create a user repository with full CRUD operations
// Requirements:
// - Create, Read, Update, Delete users
// - Transaction support for atomic operations
// - Soft delete (mark as deleted, don't remove)
// - Optimistic locking (version field)
// - Connection pooling
// - Error handling and logging
// - Type-safe queries
// - Pagination support for list operations
//
// User model:
// {
//   id: string (UUID)
//   email: string (unique)
//   name: string
//   createdAt: Date
//   updatedAt: Date
//   deletedAt: Date | null
//   version: number
// }

import { PrismaClient, User, Prisma } from '@prisma/client';
import { v4 as uuidv4 } from 'uuid';

export class UserRepository {
  private prisma: PrismaClient;
  
  constructor(prismaClient: PrismaClient) {
    this.prisma = prismaClient;
  }
  
  /**
   * Create a new user
   * @param data User creation data
   * @returns Created user
   * @throws {Error} If email already exists
   */
  async create(data: Prisma.UserCreateInput): Promise<User> {
    try {
      // Check if email already exists
      const existing = await this.findByEmail(data.email);
      if (existing && !existing.deletedAt) {
        throw new Error(`User with email ${data.email} already exists`);
      }
      
      // Create user with UUID
      const user = await this.prisma.user.create({
        data: {
          ...data,
          id: uuidv4(),
          version: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      });
      
      console.log(`User created: ${user.id}`);
      return user;
      
    } catch (error) {
      console.error('Failed to create user:', error);
      throw error;
    }
  }
  
  /**
   * Find user by ID (excludes soft-deleted)
   * @param id User ID
   * @returns User or null if not found
   */
  async findById(id: string): Promise<User | null> {
    return this.prisma.user.findFirst({
      where: {
        id,
        deletedAt: null, // Exclude soft-deleted
      },
    });
  }
  
  /**
   * Find user by email (excludes soft-deleted)
   * @param email User email
   * @returns User or null if not found
   */
  async findByEmail(email: string): Promise<User | null> {
    return this.prisma.user.findFirst({
      where: {
        email,
        deletedAt: null,
      },
    });
  }
  
  /**
   * List users with pagination
   * @param options Pagination options
   * @returns Paginated user list
   */
  async list(options: {
    page?: number;
    pageSize?: number;
    includeDeleted?: boolean;
  } = {}): Promise<{
    users: User[];
    total: number;
    page: number;
    pageSize: number;
    totalPages: number;
  }> {
    const page = options.page || 1;
    const pageSize = options.pageSize || 20;
    const skip = (page - 1) * pageSize;
    
    const where: Prisma.UserWhereInput = options.includeDeleted
      ? {}
      : { deletedAt: null };
    
    const [users, total] = await Promise.all([
      this.prisma.user.findMany({
        where,
        skip,
        take: pageSize,
        orderBy: { createdAt: 'desc' },
      }),
      this.prisma.user.count({ where }),
    ]);
    
    return {
      users,
      total,
      page,
      pageSize,
      totalPages: Math.ceil(total / pageSize),
    };
  }
  
  /**
   * Update user with optimistic locking
   * @param id User ID
   * @param data Update data
   * @param expectedVersion Expected version for optimistic locking
   * @returns Updated user
   * @throws {Error} If version mismatch (concurrent modification)
   */
  async update(
    id: string,
    data: Prisma.UserUpdateInput,
    expectedVersion: number
  ): Promise<User> {
    return this.prisma.$transaction(async (tx) => {
      // Check current version
      const current = await tx.user.findUnique({
        where: { id },
      });
      
      if (!current) {
        throw new Error(`User not found: ${id}`);
      }
      
      if (current.deletedAt) {
        throw new Error(`Cannot update deleted user: ${id}`);
      }
      
      if (current.version !== expectedVersion) {
        throw new Error(
          `Version mismatch: expected ${expectedVersion}, ` +
          `got ${current.version}. User was modified by another process.`
        );
      }
      
      // Update with incremented version
      const updated = await tx.user.update({
        where: { id },
        data: {
          ...data,
          version: { increment: 1 },
          updatedAt: new Date(),
        },
      });
      
      console.log(`User updated: ${id} (version ${updated.version})`);
      return updated;
    });
  }
  
  /**
   * Soft delete user
   * @param id User ID
   * @returns Deleted user
   */
  async softDelete(id: string): Promise<User> {
    const user = await this.prisma.user.update({
      where: { id },
      data: {
        deletedAt: new Date(),
        updatedAt: new Date(),
      },
    });
    
    console.log(`User soft deleted: ${id}`);
    return user;
  }
  
  /**
   * Permanently delete user
   * @param id User ID
   * @warning This is irreversible!
   */
  async hardDelete(id: string): Promise<void> {
    await this.prisma.user.delete({
      where: { id },
    });
    
    console.log(`User permanently deleted: ${id}`);
  }
  
  /**
   * Restore soft-deleted user
   * @param id User ID
   * @returns Restored user
   */
  async restore(id: string): Promise<User> {
    const user = await this.prisma.user.findUnique({
      where: { id },
    });
    
    if (!user) {
      throw new Error(`User not found: ${id}`);
    }
    
    if (!user.deletedAt) {
      throw new Error(`User is not deleted: ${id}`);
    }
    
    const restored = await this.prisma.user.update({
      where: { id },
      data: {
        deletedAt: null,
        updatedAt: new Date(),
      },
    });
    
    console.log(`User restored: ${id}`);
    return restored;
  }
  
  /**
   * Bulk create users in transaction
   * @param users Array of user creation data
   * @returns Array of created users
   */
  async bulkCreate(users: Prisma.UserCreateInput[]): Promise<User[]> {
    return this.prisma.$transaction(
      users.map((data) =>
        this.prisma.user.create({
          data: {
            ...data,
            id: uuidv4(),
            version: 1,
            createdAt: new Date(),
            updatedAt: new Date(),
          },
        })
      )
    );
  }
}

// Usage example
async function example() {
  const prisma = new PrismaClient();
  const userRepo = new UserRepository(prisma);
  
  try {
    // Create user
    const user = await userRepo.create({
      email: 'john@example.com',
      name: 'John Doe',
    });
    
    // Update user (with optimistic locking)
    const updated = await userRepo.update(
      user.id,
      { name: 'John Smith' },
      user.version
    );
    
    // List users with pagination
    const { users, total, totalPages } = await userRepo.list({
      page: 1,
      pageSize: 10,
    });
    
    console.log(`Found ${total} users across ${totalPages} pages`);
    
    // Soft delete
    await userRepo.softDelete(user.id);
    
    // Restore
    await userRepo.restore(user.id);
    
  } finally {
    await prisma.$disconnect();
  }
}
```

---

## Error Handling

### Comprehensive Error Handling Strategy

```python
from typing import Optional, Dict, Any
from enum import Enum
import logging
from functools import wraps
import traceback

# Create a comprehensive error handling system
# Requirements:
# - Custom exception hierarchy
# - Error codes and categories
# - Detailed error logging
# - User-friendly error messages
# - Error recovery strategies
# - Retry logic with exponential backoff
# - Error reporting to monitoring service

# === Custom Exception Hierarchy ===

class ErrorCategory(Enum):
    """Error categories for classification."""
    VALIDATION = "validation"
    AUTHENTICATION = "authentication"
    AUTHORIZATION = "authorization"
    NOT_FOUND = "not_found"
    CONFLICT = "conflict"
    EXTERNAL_SERVICE = "external_service"
    DATABASE = "database"
    INTERNAL = "internal"


class AppError(Exception):
    """Base exception for all application errors."""
    
    def __init__(
        self,
        message: str,
        code: str,
        category: ErrorCategory,
        details: Optional[Dict[str, Any]] = None,
        status_code: int = 500
    ):
        self.message = message
        self.code = code
        self.category = category
        self.details = details or {}
        self.status_code = status_code
        super().__init__(self.message)
    
    def to_dict(self) -> Dict[str, Any]:
        """Convert error to dictionary for API responses."""
        return {
            "error": {
                "code": self.code,
                "message": self.message,
                "category": self.category.value,
                "details": self.details,
            }
        }


class ValidationError(AppError):
    """Raised when input validation fails."""
    
    def __init__(self, message: str, field: str, value: Any = None):
        super().__init__(
            message=message,
            code="VALIDATION_ERROR",
            category=ErrorCategory.VALIDATION,
            details={"field": field, "value": value},
            status_code=400
        )


class AuthenticationError(AppError):
    """Raised when authentication fails."""
    
    def __init__(self, message: str = "Authentication failed"):
        super().__init__(
            message=message,
            code="AUTH_ERROR",
            category=ErrorCategory.AUTHENTICATION,
            status_code=401
        )


class AuthorizationError(AppError):
    """Raised when user lacks required permissions."""
    
    def __init__(self, message: str, required_permission: str):
        super().__init__(
            message=message,
            code="AUTHORIZATION_ERROR",
            category=ErrorCategory.AUTHORIZATION,
            details={"required_permission": required_permission},
            status_code=403
        )


class NotFoundError(AppError):
    """Raised when requested resource not found."""
    
    def __init__(self, resource_type: str, resource_id: Any):
        super().__init__(
            message=f"{resource_type} not found",
            code="NOT_FOUND",
            category=ErrorCategory.NOT_FOUND,
            details={"resource_type": resource_type, "resource_id": str(resource_id)},
            status_code=404
        )


class ConflictError(AppError):
    """Raised when operation conflicts with current state."""
    
    def __init__(self, message: str, conflicting_resource: Optional[str] = None):
        super().__init__(
            message=message,
            code="CONFLICT",
            category=ErrorCategory.CONFLICT,
            details={"conflicting_resource": conflicting_resource},
            status_code=409
        )


class ExternalServiceError(AppError):
    """Raised when external service call fails."""
    
    def __init__(self, service_name: str, original_error: Exception):
        super().__init__(
            message=f"External service error: {service_name}",
            code="EXTERNAL_SERVICE_ERROR",
            category=ErrorCategory.EXTERNAL_SERVICE,
            details={
                "service": service_name,
                "original_error": str(original_error)
            },
            status_code=502
        )


# === Error Handling Decorator ===

def handle_errors(logger: Optional[logging.Logger] = None):
    """
    Decorator for comprehensive error handling.
    Catches exceptions, logs them, and converts to AppError.
    """
    def decorator(func):
        @wraps(func)
        async def async_wrapper(*args, **kwargs):
            try:
                return await func(*args, **kwargs)
            except AppError:
                # Re-raise our custom errors
                raise
            except Exception as e:
                # Log unexpected errors
                if logger:
                    logger.error(
                        f"Unexpected error in {func.__name__}: {str(e)}",
                        exc_info=True
                    )
                
                # Convert to internal error
                raise AppError(
                    message="An internal error occurred",
                    code="INTERNAL_ERROR",
                    category=ErrorCategory.INTERNAL,
                    details={"function": func.__name__}
                )
        
        @wraps(func)
        def sync_wrapper(*args, **kwargs):
            try:
                return func(*args, **kwargs)
            except AppError:
                raise
            except Exception as e:
                if logger:
                    logger.error(
                        f"Unexpected error in {func.__name__}: {str(e)}",
                        exc_info=True
                    )
                
                raise AppError(
                    message="An internal error occurred",
                    code="INTERNAL_ERROR",
                    category=ErrorCategory.INTERNAL,
                    details={"function": func.__name__}
                )
        
        # Return appropriate wrapper based on function type
        import inspect
        if inspect.iscoroutinefunction(func):
            return async_wrapper
        return sync_wrapper
    
    return decorator


# === Retry Logic ===

import asyncio
from typing import TypeVar, Callable

T = TypeVar('T')

async def retry_with_backoff(
    func: Callable[..., T],
    max_retries: int = 3,
    base_delay: float = 1.0,
    max_delay: float = 60.0,
    exponential_base: float = 2.0,
    *args,
    **kwargs
) -> T:
    """
    Retry function with exponential backoff.
    
    Args:
        func: Async function to retry
        max_retries: Maximum number of retry attempts
        base_delay: Initial delay in seconds
        max_delay: Maximum delay between retries
        exponential_base: Base for exponential backoff
        *args, **kwargs: Arguments to pass to func
        
    Returns:
        Result from successful function call
        
    Raises:
        Last exception if all retries fail
    """
    last_exception = None
    
    for attempt in range(max_retries + 1):
        try:
            return await func(*args, **kwargs)
            
        except Exception as e:
            last_exception = e
            
            if attempt == max_retries:
                # Last attempt failed
                break
            
            # Calculate delay with exponential backoff
            delay = min(
                base_delay * (exponential_base ** attempt),
                max_delay
            )
            
            logging.warning(
                f"Attempt {attempt + 1}/{max_retries} failed: {str(e)}. "
                f"Retrying in {delay:.2f}s..."
            )
            
            await asyncio.sleep(delay)
    
    # All retries failed
    raise ExternalServiceError(
        service_name=func.__name__,
        original_error=last_exception
    )


# === Usage Example ===

logger = logging.getLogger(__name__)

@handle_errors(logger=logger)
async def create_user(email: str, password: str) -> Dict[str, Any]:
    """
    Create a new user with comprehensive error handling.
    """
    # Validate input
    if not email or '@' not in email:
        raise ValidationError(
            message="Invalid email format",
            field="email",
            value=email
        )
    
    if len(password) < 8:
        raise ValidationError(
            message="Password must be at least 8 characters",
            field="password"
        )
    
    # Check if user exists
    existing_user = await db.users.find_one({"email": email})
    if existing_user:
        raise ConflictError(
            message="User already exists",
            conflicting_resource=f"user:{email}"
        )
    
    # Create user with retry logic
    user = await retry_with_backoff(
        db.users.insert_one,
        max_retries=3,
        {"email": email, "password": hash_password(password)}
    )
    
    # Send welcome email (external service)
    try:
        await send_welcome_email(email)
    except Exception as e:
        # Log but don't fail user creation
        logger.warning(f"Failed to send welcome email: {str(e)}")
    
    return {"id": str(user.inserted_id), "email": email}


# === FastAPI Error Handler ===

from fastapi import FastAPI, Request
from fastapi.responses import JSONResponse

app = FastAPI()

@app.exception_handler(AppError)
async def app_error_handler(request: Request, exc: AppError):
    """Global error handler for FastAPI."""
    return JSONResponse(
        status_code=exc.status_code,
        content=exc.to_dict()
    )
```

---

*Last Updated: January 28, 2026*  
*This is a living document - patterns are updated as new best practices emerge*
